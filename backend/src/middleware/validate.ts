import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject, ZodError } from 'zod';

export const validateBody = (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation error',
          issues: error.errors,
        });
      }

      return next(error);
    }
  };
