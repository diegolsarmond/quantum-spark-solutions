import { jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import request from 'supertest';

const password = 'ComplexP@ssw0rd';
const passwordHash = bcrypt.hashSync(password, 10);

const adminUser = {
  id: 'admin-1',
  email: 'admin@example.com',
  passwordHash,
  name: 'Admin User',
  createdAt: new Date('2024-01-01T00:00:00.000Z'),
  updatedAt: new Date('2024-01-01T00:00:00.000Z'),
};

interface AdminRecord {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

type PrismaMockError = Error & {
  code: 'P2002' | 'P2025';
  clientVersion: string;
  meta?: Record<string, unknown> | null;
};

const createPrismaError = (
  code: PrismaMockError['code'],
  message = 'Prisma error',
  meta?: PrismaMockError['meta']
): PrismaMockError =>
  Object.assign(new Error(message), {
    name: 'PrismaClientKnownRequestError',
    code,
    clientVersion: '5.13.0',
    meta: meta ?? null,
  });

interface SessionRecord {
  id: string;
  token: string;
  adminId: string;
  expiresAt: Date;
}

interface BlogPostRecord {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  publishedAt: Date | null;
  authorId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ServiceRecord {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

let sessions: SessionRecord[] = [];
let posts: BlogPostRecord[] = [];
let services: ServiceRecord[] = [];
let adminUsers: AdminRecord[] = [];

const prismaMock = {
  adminUser: {
    findUnique: jest.fn(async ({ where }: { where: { email?: string; id?: string } }) => {
      if (where.email) {
        return adminUsers.find((user) => user.email === where.email) ?? null;
      }
      if (where.id) {
        return adminUsers.find((user) => user.id === where.id) ?? null;
      }
      return null;
    }),
    create: jest.fn(async ({ data }: { data: Omit<AdminRecord, 'createdAt' | 'updatedAt' | 'id'> & Partial<AdminRecord> }) => {
      if (adminUsers.some((user) => user.email === data.email)) {
        throw createPrismaError('P2002', 'Unique constraint failed on the fields: (`email`)', {
          target: ['email'],
        });
      }

      const now = new Date();
      const record: AdminRecord = {
        id: data.id ?? `admin-${adminUsers.length + 1}`,
        email: data.email!,
        passwordHash: data.passwordHash!,
        name: data.name!,
        createdAt: now,
        updatedAt: now,
      };

      adminUsers.push(record);
      return record;
    }),
  },
  sessionToken: {
    create: jest.fn(async ({ data }: { data: SessionRecord & { createdAt?: Date } }) => {
      const record: SessionRecord = {
        id: data.id,
        token: data.token,
        adminId: data.adminId,
        expiresAt: data.expiresAt,
      };
      sessions.push(record);
      return { ...record, createdAt: new Date() };
    }),
    delete: jest.fn(async ({ where }: { where: { id: string } }) => {
      const index = sessions.findIndex((session) => session.id === where.id);
      if (index === -1) {
        throw createPrismaError('P2025', 'Session not found');

      }
      const [removed] = sessions.splice(index, 1);
      return { ...removed, createdAt: new Date() };
    }),
    findUnique: jest.fn(async ({ where }: { where: { id: string } }) => {
      const session = sessions.find((item) => item.id === where.id);
      if (!session) {
        return null;
      }
      const admin = adminUsers.find((user) => user.id === session.adminId) ?? adminUsers[0];
      return { ...session, createdAt: new Date(), admin };
    }),
  },
  blogPost: {
    findMany: jest.fn(async () => posts.slice()),
    create: jest.fn(
      async ({ data }: { data: Omit<BlogPostRecord, 'id' | 'createdAt' | 'updatedAt'> & Partial<BlogPostRecord> }) => {
        if (posts.some((post) => post.slug === data.slug)) {
          throw createPrismaError('P2002', 'Unique constraint failed on the fields: (`slug`)', {
            target: ['slug'],
          });
        }
        const now = new Date();
        const record: BlogPostRecord = {
          id: data.id ?? `post-${posts.length + 1}`,
          title: data.title!,
          slug: data.slug!,
          content: data.content!,
          published: data.published ?? false,
          publishedAt: data.publishedAt ?? null,
          authorId: data.authorId ?? null,
          createdAt: now,
          updatedAt: now,
        };
        posts.push(record);
        return record;
      }
    ),

    findUnique: jest.fn(async ({ where }: { where: { id?: string; slug?: string } }) => {
      if (where.id) {
        return posts.find((post) => post.id === where.id) ?? null;
      }
      if (where.slug) {
        return posts.find((post) => post.slug === where.slug) ?? null;
      }
      return null;
    }),
    update: jest.fn(async ({ where, data }: { where: { id: string }; data: Partial<BlogPostRecord> }) => {
      const post = posts.find((item) => item.id === where.id);
      if (!post) {
        throw createPrismaError('P2025', 'Post not found');

      }
      Object.assign(post, data, { updatedAt: new Date() });
      return post;
    }),
    delete: jest.fn(async ({ where }: { where: { id: string } }) => {
      const index = posts.findIndex((post) => post.id === where.id);
      if (index === -1) {
        throw createPrismaError('P2025', 'Post not found');

      }
      const [removed] = posts.splice(index, 1);
      return removed;
    }),
  },
  service: {
    findMany: jest.fn(async () => services.slice()),
    create: jest.fn(async ({ data }: { data: Omit<ServiceRecord, 'id' | 'createdAt' | 'updatedAt'> & Partial<ServiceRecord> }) => {
      const now = new Date();
      const record: ServiceRecord = {
        id: data.id ?? `service-${services.length + 1}`,
        name: data.name!,
        description: data.description!,

        isActive: data.isActive ?? true,
        createdAt: now,
        updatedAt: now,
      };
      services.push(record);
      return record;
    }),
    update: jest.fn(async ({ where, data }: { where: { id: string }; data: Partial<ServiceRecord> }) => {
      const service = services.find((item) => item.id === where.id);
      if (!service) {
        throw createPrismaError('P2025', 'Service not found');

      }
      Object.assign(service, data, { updatedAt: new Date() });
      return service;
    }),
    delete: jest.fn(async ({ where }: { where: { id: string } }) => {
      const index = services.findIndex((service) => service.id === where.id);
      if (index === -1) {
        throw createPrismaError('P2025', 'Service not found');

      }
      const [removed] = services.splice(index, 1);
      return removed;
    }),
  },
};

jest.unstable_mockModule('../lib/prisma.js', () => ({
  prisma: prismaMock,
}));

const { app } = await import('../app.js');

describe('Admin routes', () => {
  beforeEach(() => {
    sessions = [];
    posts = [];
    services = [];
    adminUsers = [{ ...adminUser }];
    jest.clearAllMocks();
  });

  const authenticate = async () => {
    const response = await request(app)
      .post('/api/admin/login')
      .send({ email: adminUsers[0]!.email, password });

    expect(response.status).toBe(200);
    const { token, user } = response.body as { token: string; user: { permissions?: string[] } };
    expect(Array.isArray(user?.permissions)).toBe(true);
    expect(user?.permissions).toContain('admin:access');
    return token;
  };

  it('authenticates an admin user and returns a token', async () => {
    const response = await request(app)
      .post('/api/admin/login')
      .send({ email: adminUsers[0]!.email, password });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      token: expect.any(String),
      user: {
        id: adminUsers[0]!.id,
        email: adminUsers[0]!.email,
        name: adminUsers[0]!.name,
        permissions: expect.arrayContaining(['admin:access']),
      },
    });
    expect(sessions).toHaveLength(1);
  });

  it('registers a new admin user', async () => {
    const response = await request(app).post('/api/admin/register').send({
      email: 'new-admin@example.com',
      password: 'An0therStrongPass!',
      name: 'New Admin',
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      email: 'new-admin@example.com',
      name: 'New Admin',
    });

    const created = adminUsers.find((user) => user.email === 'new-admin@example.com');
    expect(created).toBeDefined();
    await expect(bcrypt.compare('An0therStrongPass!', created!.passwordHash)).resolves.toBe(true);
  });

  it('normalizes admin routes with trailing whitespace in the URL', async () => {
    const response = await request(app).post('/api/admin/register%20').send({
      email: 'encoded-space@example.com',
      password: 'Encod3dSp@ce!',
      name: 'Encoded Space',
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      email: 'encoded-space@example.com',
      name: 'Encoded Space',
    });

    expect(adminUsers.some((user) => user.email === 'encoded-space@example.com')).toBe(true);
  });

  it('rejects duplicated admin registrations', async () => {
    const firstResponse = await request(app).post('/api/admin/register').send({
      email: 'duplicate@example.com',
      password: 'Duplicat3Pass!',
      name: 'First Admin',
    });

    expect(firstResponse.status).toBe(201);

    const duplicateResponse = await request(app).post('/api/admin/register').send({
      email: 'duplicate@example.com',
      password: 'Duplicat3Pass!',
      name: 'Second Admin',
    });

    expect(duplicateResponse.status).toBe(409);
    expect(duplicateResponse.body.message).toBe('Email already registered');
  });

  it('creates, lists and deletes blog posts', async () => {
    const token = await authenticate();

    const createResponse = await request(app)
      .post('/api/admin/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'First post',
        slug: 'first-post',
        content: 'Hello world',
        published: true,
      });

    expect(createResponse.status).toBe(201);

    const listResponse = await request(app)
      .get('/api/admin/posts')
      .set('Authorization', `Bearer ${token}`);

    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toHaveLength(1);

    const postId = listResponse.body[0].id as string;


    const deleteResponse = await request(app)
      .delete(`/api/admin/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteResponse.status).toBe(204);
    expect(posts).toHaveLength(0);
  });

  it('rejects duplicated blog post slugs', async () => {
    const token = await authenticate();

    await request(app)
      .post('/api/admin/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Post', slug: 'duplicate', content: 'One' });

    const duplicateResponse = await request(app)
      .post('/api/admin/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Another', slug: 'duplicate', content: 'Two' });

    expect(duplicateResponse.status).toBe(409);
    expect(duplicateResponse.body.message).toContain('Unique constraint failed');
  });


  it('updates services data', async () => {
    const token = await authenticate();

    const createResponse = await request(app)
      .post('/api/admin/services')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Consulting', description: 'Tech consulting' });

    expect(createResponse.status).toBe(201);

    const serviceId = createResponse.body.id as string;

    const updateResponse = await request(app)
      .put(`/api/admin/services/${serviceId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'Updated description' });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.description).toBe('Updated description');
  });

  it('returns 404 when updating an unknown service', async () => {
    const token = await authenticate();

    const updateResponse = await request(app)
      .put('/api/admin/services/missing')
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'Nope' });

    expect(updateResponse.status).toBe(404);
    expect(updateResponse.body.message).toBe('Record not found');
  });


  it('revokes a session on logout', async () => {
    const token = await authenticate();
    const sessionId = sessions[0]?.id;

    const logoutResponse = await request(app)
      .post('/api/admin/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(logoutResponse.status).toBe(200);
    expect(sessions.find((session) => session.id === sessionId)).toBeUndefined();
  });

  it('returns a JSON 404 response for unknown routes', async () => {
    const response = await request(app).get('/api/non-existent');

    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toEqual({ message: 'Route not found' });
  });
});
