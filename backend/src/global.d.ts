import type { AdminUser } from '@prisma/client';
import type { RequestHandler } from 'express';

declare module 'cors' {
  type CorsOptionsDelegate = (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void;

  interface CorsOptions {
    origin?: boolean | string | RegExp | (string | RegExp)[] | CorsOptionsDelegate;
  }

  type CorsMiddleware = (options?: CorsOptions) => RequestHandler;

  const cors: CorsMiddleware;
  export default cors;
}

declare module 'cors/lib/index.js' {
  import cors from 'cors';
  export default cors;
}

declare global {
  namespace Express {
    interface Request {
      admin?: Pick<AdminUser, 'id' | 'email' | 'name'> & { sessionId: string };
    }
  }
}

export {};
