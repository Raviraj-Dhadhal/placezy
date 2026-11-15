import { Response, NextFunction } from 'express';
import { SocialService } from './social.service';
import { AuthenticatedRequest } from '../../types';
import { sendResponse } from '../../utils/apiResponse.util';

export class ReviewController {
  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const review = await SocialService.createReview(
        req.user.userId,
        req.user.email.split('@')[0],
        undefined,
        req.body
      );
      sendResponse(res, 201, true, 'Review submitted successfully', review);
    } catch (error) {
      next(error);
    }
  }

  static async getByPlace(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const placeId = Array.isArray(req.params.placeId) ? req.params.placeId[0] : req.params.placeId;
      const reviews = await SocialService.getPlaceReviews(placeId);
      sendResponse(res, 200, true, 'Reviews retrieved successfully', reviews);
    } catch (error) {
      next(error);
    }
  }

  static async toggleLike(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const reviewId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const review = await SocialService.toggleLikeReview(reviewId, req.user.userId);
      sendResponse(res, 200, true, 'Review like toggled', review);
    } catch (error) {
      next(error);
    }
  }
}

export class WishlistController {
  static async toggle(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const placeId = Array.isArray(req.params.placeId) ? req.params.placeId[0] : req.params.placeId;
      const result = await SocialService.toggleWishlist(req.user.userId, placeId);
      sendResponse(res, 200, true, result.saved ? 'Saved to wishlist' : 'Removed from wishlist', result);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const wishlist = await SocialService.getUserWishlist(req.user.userId);
      sendResponse(res, 200, true, 'Wishlist retrieved successfully', wishlist);
    } catch (error) {
      next(error);
    }
  }
}

export class NotificationController {
  static async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const notifications = await SocialService.getUserNotifications(req.user.userId);
      sendResponse(res, 200, true, 'Notifications retrieved successfully', notifications);
    } catch (error) {
      next(error);
    }
  }

  static async markRead(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const notif = await SocialService.markNotificationRead(id, req.user.userId);
      sendResponse(res, 200, true, 'Notification marked as read', notif);
    } catch (error) {
      next(error);
    }
  }
}
