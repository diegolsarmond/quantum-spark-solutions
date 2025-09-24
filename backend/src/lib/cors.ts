import { createRequire } from 'node:module';
import type { RequestHandler } from 'express';

const require = createRequire(import.meta.url);

export type CorsCallback = (err: Error | null, allow?: boolean) => void;

export type CorsOptionsDelegate = (
  origin: string | undefined,
  callback: CorsCallback,
) => void;

export interface CorsOptions {
  origin?: boolean | string | RegExp | Array<string | RegExp> | CorsOptionsDelegate;
}

export type CorsMiddleware = (options?: CorsOptions) => RequestHandler;

const corsModule = require('cors') as unknown;

const cors = corsModule as CorsMiddleware;

export default cors;
