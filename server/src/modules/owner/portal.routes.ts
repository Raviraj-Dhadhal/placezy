import { Router } from 'express';
import { OwnerController, AdminController } from './portal.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';

export const ownerRoutes = Router();
ownerRoutes.use(authenticate, authorize('owner', 'admin'));
ownerRoutes.get('/listings', OwnerController.getListings);
ownerRoutes.post('/register', OwnerController.registerBusiness);
ownerRoutes.get('/reviews', OwnerController.getReviews);
ownerRoutes.post('/reviews/:id/reply', OwnerController.replyReview);
ownerRoutes.get('/analytics', OwnerController.getAnalytics);

export const adminRoutes = Router();
adminRoutes.use(authenticate, authorize('admin'));
adminRoutes.get('/metrics', AdminController.getMetrics);
adminRoutes.get('/users', AdminController.getUsers);
adminRoutes.get('/businesses', AdminController.getBusinesses);
adminRoutes.put('/businesses/:id/verify', AdminController.verifyBusiness);
