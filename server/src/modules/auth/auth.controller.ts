import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { sendResponse } from '../../utils/apiResponse.util';

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
}
