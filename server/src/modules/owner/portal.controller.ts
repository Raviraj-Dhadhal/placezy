import { Response, NextFunction } from 'express';
import { OwnerService, AdminService } from './portal.service';
import { AuthenticatedRequest } from '../../types';
import { sendResponse } from '../../utils/apiResponse.util';

export class OwnerController {
  static async getListings(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const listings = await OwnerService.getMyListings(req.user.userId);
      sendResponse(res, 200, true, 'Listings retrieved', listings);
    } catch (error) {
      next(error);
    }
  }

  static async registerBusiness(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const place = await OwnerService.registerBusiness(req.user.userId, req.body);
      sendResponse(res, 201, true, 'Business submitted for verification', place);
    } catch (error) {
      next(error);
    }
  }

  static async getReviews(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const reviews = await OwnerService.getOwnerReviews(req.user.userId);
      sendResponse(res, 200, true, 'Owner reviews retrieved', reviews);
    } catch (error) {
      next(error);
    }
  }

  static async replyReview(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const reviewId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const review = await OwnerService.replyToReview(req.user.userId, reviewId, req.body.content);
      sendResponse(res, 200, true, 'Reply posted successfully', review);
    } catch (error) {
      next(error);
    }
  }

  static async getAnalytics(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const analytics = await OwnerService.getAnalytics(req.user.userId);
      sendResponse(res, 200, true, 'Owner analytics calculated', analytics);
    } catch (error) {
      next(error);
    }
  }
}

export class AdminController {
  static async getMetrics(_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const metrics = await AdminService.getDashboardMetrics();
      sendResponse(res, 200, true, 'Metrics retrieved', metrics);
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await AdminService.getAllUsers();
      sendResponse(res, 200, true, 'Users directory retrieved', users);
    } catch (error) {
      next(error);
    }
  }

  static async getBusinesses(_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const businesses = await AdminService.getAllBusinesses();
      sendResponse(res, 200, true, 'Businesses directory retrieved', businesses);
    } catch (error) {
      next(error);
    }
  }

  static async verifyBusiness(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const placeId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const place = await AdminService.verifyBusiness(placeId, req.body.isVerified);
      sendResponse(res, 200, true, 'Business verification updated', place);
    } catch (error) {
      next(error);
    }
  }
}
