import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { sendResponse } from '../../utils/apiResponse.util';
import { AuthenticatedRequest } from '../../types';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.register(req.body);
      sendResponse(res, 201, true, 'User registered successfully', result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.login(req.body);
      sendResponse(res, 200, true, 'Login successful', result);
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.userId) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const user = await AuthService.getMe(req.user.userId);
      if (!user) {
        sendResponse(res, 404, false, 'User profile not found');
        return;
      }
      sendResponse(res, 200, true, 'Profile fetched successfully', user);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.userId) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const updated = await AuthService.updateProfile(req.user.userId, req.body);
      sendResponse(res, 200, true, 'Profile updated successfully', updated);
    } catch (error) {
      next(error);
    }
  }

  static async updateInterests(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.userId) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const { interests } = req.body;
      const updated = await AuthService.updateInterests(req.user.userId, interests || []);
      sendResponse(res, 200, true, 'Interests updated successfully', updated);
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const result = await AuthService.forgotPassword(email);
      sendResponse(res, 200, true, result.message, result);
    } catch (error) {
      next(error);
    }
  }
}
