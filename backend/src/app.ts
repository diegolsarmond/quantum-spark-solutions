import cors from 'cors';
import express from 'express';

import { errorHandler } from './middleware/errorHandler.js';
import { adminRouter } from './routes/admin.js';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

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
