import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

type PrismaKnownError = Error & {
  code: string;
  clientVersion: string;
  meta?: Record<string, unknown> | null;
};

const isPrismaKnownError = (error: unknown): error is PrismaKnownError =>
  error instanceof Error &&
  typeof (error as Partial<PrismaKnownError>).code === 'string' &&
  typeof (error as Partial<PrismaKnownError>).clientVersion === 'string';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      issues: err.errors,
    });
  }

  if (isPrismaKnownError(err)) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        message: 'Unique constraint failed',
        meta: err.meta ?? undefined,
      });
    }

    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Record not found' });
    }
  }

  if (err instanceof Error) {
    return res.status(500).json({
      message: err.message,
    });
  }

  return res.status(500).json({ message: 'Unexpected error' });
};
