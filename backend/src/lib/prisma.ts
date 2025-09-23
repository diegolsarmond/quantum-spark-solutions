import { PrismaClient } from '@prisma/client';

import { env } from '../config/env.js';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaClient = globalThis.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: env.databaseUrl,
    },
  },
});

if (env.nodeEnv !== 'production') {
  globalThis.prisma = prismaClient;
}

export const prisma = prismaClient;
