import { Router } from 'express';
import { ReviewController, WishlistController, NotificationController } from './social.controller';
import { authenticate } from '../../middleware/auth.middleware';

export const reviewRoutes = Router();
reviewRoutes.get('/place/:placeId', ReviewController.getByPlace);
reviewRoutes.post('/', authenticate, ReviewController.create);
reviewRoutes.post('/:id/like', authenticate, ReviewController.toggleLike);

export const wishlistRoutes = Router();
wishlistRoutes.get('/', authenticate, WishlistController.getAll);
wishlistRoutes.post('/toggle/:placeId', authenticate, WishlistController.toggle);

export const notificationRoutes = Router();
notificationRoutes.get('/', authenticate, NotificationController.getAll);
notificationRoutes.put('/:id/read', authenticate, NotificationController.markRead);
