import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3),
});

export const blogPostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(1),
  author: z.string().min(1),
  category: z.string().min(1),
  date: z.string().min(1),
  readTime: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  image: z.string().url().optional(),
  featured: z.boolean().optional().default(false),
});

export const updateBlogPostSchema = blogPostSchema.partial();

export const serviceSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(1),
  isActive: z.boolean().optional().default(true),
});

export const updateServiceSchema = serviceSchema.partial();
