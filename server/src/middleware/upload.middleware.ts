import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Ensure uploads base directory exists
const UPLOADS_DIR = path.join(__dirname, '../../uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Subdirectories: reviews, places, avatars
export type UploadFolder = 'reviews' | 'places' | 'avatars';

export const createUploader = (subfolder: UploadFolder = 'reviews') => {
  const targetDir = path.join(UPLOADS_DIR, subfolder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb) => {
      cb(null, targetDir);
    },
    filename: (_req: Request, file: Express.Multer.File, cb) => {
      // Secure sanitized unique filename: timestamp-random-name.ext
      const ext = path.extname(file.originalname).toLowerCase();
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${subfolder}-${uniqueSuffix}${ext}`);
    },
  });

  const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/avif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and AVIF images are permitted.'));
    }
  };

  return multer({
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit per image
    },
    fileFilter,
  });
};
