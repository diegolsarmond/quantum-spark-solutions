import { randomUUID } from 'crypto';

import bcrypt from 'bcrypt';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import { prisma } from '../lib/prisma.js';
import { authenticate } from '../middleware/authenticate.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validateBody } from '../middleware/validate.js';
import {
  blogPostSchema,
  loginSchema,
  registerSchema,
  serviceSchema,
  updateBlogPostSchema,
  updateServiceSchema,
} from '../validators/admin.js';

export const adminRouter = Router();

const serializeBlogPost = <T extends { image: string | null; tags?: string[] | null }>(post: T) => ({
  ...post,
  image: post.image ?? undefined,
  tags: post.tags ?? [],
});

adminRouter.post(
  '/register',
  validateBody(registerSchema),
  asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;

    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const admin = await prisma.adminUser.create({
      data: {
        email,
        name,
        passwordHash,
      },
    });

    return res.status(201).json({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    });
  })
);

adminRouter.post(
  '/login',
  validateBody(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await prisma.adminUser.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, admin.passwordHash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const session = await prisma.sessionToken.create({
      data: {
        id: randomUUID(),
        token: randomUUID(),
        adminId: admin.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    const jwtToken = jwt.sign(
      {
        sub: admin.id,
        sessionId: session.id,
      },
      env.jwtSecret,
      { expiresIn: '1h' }
    );

    return res.json({
      token: jwtToken,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        roles: ['admin'],
        permissions: ['admin:access'],
      },
    });
  })
);

adminRouter.post(
  '/logout',
  authenticate,
  asyncHandler(async (req, res) => {
    if (!req.admin) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    await prisma.sessionToken.delete({ where: { id: req.admin.sessionId } }).catch(() => undefined);

    return res.json({ message: 'Logged out' });
  })
);

adminRouter.use(authenticate);

adminRouter.get(
  '/posts',
  asyncHandler(async (req, res) => {
    const slugQuery = req.query.slug;
    const slug = Array.isArray(slugQuery) ? slugQuery[0] : slugQuery;

    if (typeof slug === 'string' && slug.trim().length > 0) {
      const post = await prisma.blogPost.findUnique({ where: { slug } });
      if (!post) {
        return res.json([]);
      }
      return res.json([serializeBlogPost(post)]);
    }

    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(posts.map(serializeBlogPost));
  })
);

adminRouter.post(
  '/posts',
  validateBody(blogPostSchema),
  asyncHandler(async (req, res) => {
    const post = await prisma.blogPost.create({
      data: {
        ...req.body,
        featured: req.body.featured ?? false,
        createdById: req.admin?.id ?? null,
      },
    });

    return res.status(201).json(serializeBlogPost(post));
  })
);

adminRouter.get(
  '/posts/:id',
  asyncHandler(async (req, res) => {
    const post = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.json(serializeBlogPost(post));
  })
);

adminRouter.put(
  '/posts/:id',
  validateBody(updateBlogPostSchema),
  asyncHandler(async (req, res) => {
    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: req.body,
    });
    return res.json(serializeBlogPost(post));

  })
);

adminRouter.delete(
  '/posts/:id',
  asyncHandler(async (req, res) => {
    await prisma.blogPost.delete({ where: { id: req.params.id } });
    return res.status(204).send();

  })
);

adminRouter.get(
  '/services',
  asyncHandler(async (_req, res) => {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(services);
  })
);

adminRouter.post(
  '/services',
  validateBody(serviceSchema),
  asyncHandler(async (req, res) => {
    const service = await prisma.service.create({
      data: {
        ...req.body,
        isActive: req.body.isActive ?? true,
      },
    });

    return res.status(201).json(service);
  })
);

adminRouter.put(
  '/services/:id',
  validateBody(updateServiceSchema),
  asyncHandler(async (req, res) => {
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: req.body,
    });
    return res.json(service);

  })
);

adminRouter.delete(
  '/services/:id',
  asyncHandler(async (req, res) => {
    await prisma.service.delete({ where: { id: req.params.id } });
    return res.status(204).send();

  })
);
