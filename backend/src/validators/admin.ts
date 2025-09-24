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
  content: z.string().min(1),
  published: z.boolean().optional().default(false),
  publishedAt: z.coerce.date().optional().nullable(),
});

export const updateBlogPostSchema = blogPostSchema.partial();

export const serviceSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(1),
  category: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  features: z.array(z.string().min(1)).min(1),
  isActive: z.boolean().optional().default(true),
});

export const updateServiceSchema = serviceSchema.partial();
