import { Router } from 'express';
import { ReviewController, WishlistController, NotificationController } from './social.controller';
import { UploadController } from './upload.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { createUploader } from '../../middleware/upload.middleware';

const reviewImageUploader = createUploader('reviews');

export const reviewRoutes = Router();

// Public approved reviews
reviewRoutes.get('/place/:placeId', ReviewController.getApprovedByPlace);

// Authenticated user review actions
reviewRoutes.get('/my-reviews', authenticate, ReviewController.getMyReviews);
reviewRoutes.post('/', authenticate, ReviewController.create);
reviewRoutes.post('/:id/like', authenticate, ReviewController.toggleLike);

// Review image upload endpoint (up to 5 photos per review)
reviewRoutes.post(
  '/upload',
  authenticate,
  reviewImageUploader.array('images', 5),
  UploadController.uploadReviewImages
);

export const wishlistRoutes = Router();
wishlistRoutes.get('/', authenticate, WishlistController.getAll);
wishlistRoutes.post('/toggle/:placeId', authenticate, WishlistController.toggle);

export const notificationRoutes = Router();
notificationRoutes.get('/', authenticate, NotificationController.getAll);
notificationRoutes.put('/read-all', authenticate, NotificationController.markAllRead);
notificationRoutes.put('/:id/read', authenticate, NotificationController.markRead);
