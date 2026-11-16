import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { config } from './config/env';
import { errorHandler } from './middleware/error.middleware';

// Domain Routes
import './modules/users/user.model';
import authRoutes from './modules/auth/auth.routes';
import placeRoutes from './modules/places/place.routes';
import { reviewRoutes, wishlistRoutes, notificationRoutes } from './modules/reviews/social.routes';
import tripRoutes from './modules/trips/trip.routes';
import { ownerRoutes, adminRoutes } from './modules/owner/portal.routes';
import contactRoutes from './modules/contact/contact.routes';
import uploadRoutes from './modules/upload/upload.routes';

export const createApp = (): express.Application => {
  const app = express();

  // Core Middlewares
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
  ];
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(null, true);
      },
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static file serving for uploads directory (Accessible at /uploads/*)
  const uploadsPath = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsPath));

  // Root Welcome & API Explorer Page (prevents "Cannot GET /")
  app.get('/', (_req, res) => {
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Placezy REST API Server</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #F8FAFC; color: #151C27; margin: 0; padding: 40px; display: flex; justify-content: center; }
          .card { background: white; border: 1px solid #E2E8F0; border-radius: 16px; padding: 32px; max-width: 600px; width: 100%; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
          .badge { display: inline-block; background: #CFE7E6; color: #006765; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
          h1 { margin: 16px 0 8px; font-size: 24px; color: #006765; }
          p { color: #555E74; font-size: 14px; line-height: 1.6; }
          .client-btn { display: inline-block; background: #006765; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin-top: 12px; }
          .endpoints { background: #F1F5F9; border-radius: 8px; padding: 16px; margin-top: 24px; font-family: monospace; font-size: 13px; }
          .endpoints div { margin: 6px 0; }
        </style>
      </head>
      <body>
        <div class="card">
          <span class="badge">Backend API Active</span>
          <h1>🚀 Placezy Express API Server</h1>
          <p>
            You are viewing the <strong>Backend API server (Port 5000)</strong>.
            To browse the full web application, visit the <strong>Frontend (Port 5173)</strong>:
          </p>
          <a href="http://localhost:5173" class="client-btn">👉 Open Placezy Web App (http://localhost:5173)</a>

          <div class="endpoints">
            <strong>Active API Endpoints:</strong>
            <div>• <a href="/health" style="color: #006765;">GET /health</a> - Health Check</div>
            <div>• <a href="/upload" style="color: #006765;">GET /upload</a> - File Upload Service</div>
            <div>• <a href="/api/places" style="color: #006765;">GET /api/places</a> - Venues & Discovery</div>
            <div>• <a href="/api/places/categories" style="color: #006765;">GET /api/places/categories</a> - Category Taxonomy</div>
            <div>• POST /api/auth/login - Authentication</div>
          </div>
        </div>
      </body>
      </html>
    `);
  });

  // Healthcheck
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  // Upload status and file inspection helper route
  app.get(['/upload', '/uploads'], (_req, res) => {
    const listDir = (dirName: string) => {
      const p = path.join(uploadsPath, dirName);
      if (fs.existsSync(p)) {
        return fs.readdirSync(p).filter((f) => f !== '.gitkeep');
      }
      return [];
    };

    res.status(200).json({
      success: true,
      message: 'Placezy Upload Storage Service',
      storage: {
        reviews: listDir('reviews'),
        places: listDir('places'),
        avatars: listDir('avatars'),
      },
      endpoints: {
        reviewUpload: 'POST /api/reviews/upload (form-data: images)',
      },
    });
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
  app.use('/api/contact', contactRoutes);
  app.use('/api/upload', uploadRoutes);

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
};
