import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { errorHandler } from './middleware/error.middleware';

// Routes
import authRoutes from './modules/auth/auth.routes';
import placeRoutes from './modules/places/place.routes';

export const createApp = (): express.Application => {
  const app = express();

  // Core Middlewares
  app.use(cors({ origin: config.corsOrigin, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Healthcheck
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/places', placeRoutes);

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
};
