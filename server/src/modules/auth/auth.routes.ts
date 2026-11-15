import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);

// Protected routes
router.get('/me', authenticate, AuthController.getMe);
router.put('/profile', authenticate, AuthController.updateProfile);
router.put('/interests', authenticate, AuthController.updateInterests);

export default router;
