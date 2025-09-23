import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

type RequiredEnv = 'DATABASE_URL' | 'JWT_SECRET';

const ensure = (key: RequiredEnv, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  databaseUrl: ensure('DATABASE_URL'),
  jwtSecret: ensure('JWT_SECRET', 'super-secret-development-key'),
};
