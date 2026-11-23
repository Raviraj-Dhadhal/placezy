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

  static async addPhotos(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const placeId = req.params.placeId as string;
      const { imageUrls } = req.body;
      if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
        sendResponse(res, 400, false, 'No image URLs provided');
        return;
      }
      const updated = await OwnerService.addPhotosToListing(req.user.userId, placeId, imageUrls);
      sendResponse(res, 200, true, 'Photos added to venue successfully', updated);
    } catch (error) {
      next(error);
    }
  }

  static async setCoverPhoto(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const placeId = req.params.placeId as string;
      const { imageUrl } = req.body;
      const updated = await OwnerService.setCoverPhoto(req.user.userId, placeId, imageUrl);
      sendResponse(res, 200, true, 'Cover photo updated successfully', updated);
    } catch (error) {
      next(error);
    }
  }

  static async deletePhoto(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const placeId = req.params.placeId as string;
      const { imageUrl } = req.body;
      const updated = await OwnerService.deletePhotoFromListing(req.user.userId, placeId, imageUrl);
      sendResponse(res, 200, true, 'Photo removed from listing', updated);
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
      const timeRange = (req.query.timeRange as string) || 'Last 30 Days';
      const analytics = await OwnerService.getAnalytics(req.user.userId, timeRange);
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

  static async createUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password, phone, city, role, gender } = req.body;
      if (!name || !email || !password) {
        sendResponse(res, 400, false, 'Name, email, and password are required');
        return;
      }
      const user = await AdminService.createUser({ name, email, password, phone, city, role, gender });
      sendResponse(res, 201, true, 'User created successfully in database', user);
    } catch (error: any) {
      next(error);
    }
  }

  static async updateUserStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const status = req.body.status;
      if (!['active', 'suspended'].includes(status)) {
        sendResponse(res, 400, false, 'Invalid status. Must be active or suspended.');
        return;
      }
      const user = await AdminService.updateUserStatus(userId, status);
      sendResponse(res, 200, true, `User ${status === 'suspended' ? 'suspended' : 'activated'} successfully`, user);
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

  static async createBusiness(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const { name, address, description } = req.body;
      if (!name || !address || !description) {
        sendResponse(res, 400, false, 'Business name, address, and description are required');
        return;
      }
      const business = await AdminService.createBusiness(req.user.userId, req.body);
      sendResponse(res, 201, true, 'Business registered successfully in database', business);
    } catch (error: any) {
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

  // ─── ADMIN REVIEW MODERATION CONTROLLER ────────────────────────────────

  static async getAllReviews(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const status = req.query.status as string;
      const reviews = await AdminService.getAllReviews(status);
      sendResponse(res, 200, true, 'Reviews retrieved for moderation', reviews);
    } catch (error) {
      next(error);
    }
  }

  static async approveReview(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const reviewId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const review = await AdminService.approveReview(reviewId, req.user.userId);
      sendResponse(res, 200, true, 'Review approved and published successfully', review);
    } catch (error) {
      next(error);
    }
  }

  static async rejectReview(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const reviewId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const { reason } = req.body;
      const review = await AdminService.rejectReview(reviewId, req.user.userId, reason || 'Content does not meet guidelines');
      sendResponse(res, 200, true, 'Review rejected', review);
    } catch (error) {
      next(error);
    }
  }

  static async deleteReview(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const reviewId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const result = await AdminService.deleteReview(reviewId);
      sendResponse(res, 200, true, 'Review deleted', result);
    } catch (error) {
      next(error);
    }
  }

  static async getSettings(_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const settings = await AdminService.getSystemSettings();
      sendResponse(res, 200, true, 'System settings retrieved', settings);
    } catch (error) {
      next(error);
    }
  }

  static async updateSettings(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const settings = await AdminService.updateSystemSettings(req.body);
      sendResponse(res, 200, true, 'System settings updated successfully in database', settings);
    } catch (error) {
      next(error);
    }
  }
}
