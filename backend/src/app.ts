import cors, { CorsOptions } from 'cors';
import express from 'express';

import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { adminRouter } from './routes/admin.js';

export const createApp = () => {
  const app = express();

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || env.corsAllowedOrigins.includes('*')) {
        return callback(null, true);
      }

      if (env.corsAllowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
  };

  const corsMiddleware = cors(corsOptions);

  app.use(corsMiddleware);
  app.options('*', corsMiddleware);
  app.use(express.json());

  app.use((req, _res, next) => {
    if (!req.url) {
      return next();
    }

    const [path, ...queryParts] = req.url.split('?');
    const trimmedPath = path.replace(/(?:%20|\s)+$/giu, '');

    if (trimmedPath !== path) {
      const query = queryParts.length ? `?${queryParts.join('?')}` : '';
      req.url = `${trimmedPath}${query}`;
    }

    next();
  });

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/admin', adminRouter);

  app.use((_req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.use(errorHandler);

  return app;
};

export const app = createApp();
