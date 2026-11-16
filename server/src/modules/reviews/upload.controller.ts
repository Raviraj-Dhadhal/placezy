import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types';
import { sendResponse } from '../../utils/apiResponse.util';

export class UploadController {
  static async uploadReviewImages(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
        sendResponse(res, 400, false, 'No image files provided');
        return;
      }

      const files = req.files as Express.Multer.File[];
      const urls = files.map((f) => `/uploads/reviews/${f.filename}`);

      sendResponse(res, 201, true, 'Images uploaded successfully', {
        urls,
        count: urls.length,
      });
    } catch (error) {
      next(error);
    }
  }

  static async uploadPlaceImage(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        sendResponse(res, 400, false, 'No image file uploaded');
        return;
      }

      const url = `/uploads/places/${req.file.filename}`;
      sendResponse(res, 201, true, 'Place image uploaded successfully', { url });
    } catch (error) {
      next(error);
    }
  }
}
