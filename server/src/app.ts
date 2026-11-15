import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { errorHandler } from './middleware/error.middleware';

// Domain Routes
import authRoutes from './modules/auth/auth.routes';
import placeRoutes from './modules/places/place.routes';
import { reviewRoutes, wishlistRoutes, notificationRoutes } from './modules/reviews/social.routes';
import tripRoutes from './modules/trips/trip.routes';
import { ownerRoutes, adminRoutes } from './modules/owner/portal.routes';

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

  // REST API Endpoints
  app.use('/api/auth', authRoutes);
  app.use('/api/places', placeRoutes);
  app.use('/api/reviews', reviewRoutes);
  app.use('/api/wishlist', wishlistRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/trips', tripRoutes);
  app.use('/api/owner', ownerRoutes);
  app.use('/api/admin', adminRoutes);

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
};
