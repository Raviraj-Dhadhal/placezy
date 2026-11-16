import { Router, Request, Response, NextFunction } from 'express';
import { createUploader } from '../../middleware/upload.middleware';
import { authenticate } from '../../middleware/auth.middleware';
import { sendResponse } from '../../utils/apiResponse.util';

const router = Router();
const placeUploader = createUploader('places');

// Upload single or multiple images for places / businesses
router.post(
  '/place-images',
  authenticate,
  placeUploader.array('images', 8),
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        sendResponse(res, 400, false, 'No images uploaded');
        return;
      }

      // Return static URLs relative to the backend origin (e.g., /uploads/places/places-1234.jpg)
      const imageUrls = files.map((f) => `/uploads/places/${f.filename}`);
      sendResponse(res, 200, true, 'Images uploaded successfully', {
        urls: imageUrls,
        primaryUrl: imageUrls[0],
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
