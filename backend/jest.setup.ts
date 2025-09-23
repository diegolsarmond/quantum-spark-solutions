process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'test-secret';
process.env.DATABASE_URL =
  process.env.DATABASE_URL ?? 'postgresql://example.com/test';
