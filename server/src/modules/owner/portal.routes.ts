import { Router } from 'express';
import { OwnerController, AdminController } from './portal.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';

export const ownerRoutes = Router();
// Allow any authenticated user to register a business (onboarding will grant them owner role)
ownerRoutes.post('/register', authenticate, OwnerController.registerBusiness);
// Management endpoints require owner or admin role
ownerRoutes.use(authenticate, authorize('owner', 'admin'));
ownerRoutes.get('/listings', OwnerController.getListings);
ownerRoutes.post('/listings/:placeId/photos', OwnerController.addPhotos);
ownerRoutes.put('/listings/:placeId/cover', OwnerController.setCoverPhoto);
ownerRoutes.delete('/listings/:placeId/photos', OwnerController.deletePhoto);
ownerRoutes.get('/reviews', OwnerController.getReviews);
ownerRoutes.post('/reviews/:id/reply', OwnerController.replyReview);
ownerRoutes.get('/analytics', OwnerController.getAnalytics);

export const adminRoutes = Router();
adminRoutes.use(authenticate, authorize('admin'));
adminRoutes.get('/metrics', AdminController.getMetrics);
adminRoutes.get('/users', AdminController.getUsers);
adminRoutes.post('/users', AdminController.createUser);
adminRoutes.put('/users/:id/status', AdminController.updateUserStatus);
adminRoutes.get('/businesses', AdminController.getBusinesses);
adminRoutes.post('/businesses', AdminController.createBusiness);
adminRoutes.put('/businesses/:id/verify', AdminController.verifyBusiness);

// Review moderation endpoints
adminRoutes.get('/reviews', AdminController.getAllReviews);
adminRoutes.patch('/reviews/:id/approve', AdminController.approveReview);
adminRoutes.patch('/reviews/:id/reject', AdminController.rejectReview);
adminRoutes.delete('/reviews/:id', AdminController.deleteReview);
adminRoutes.get('/settings', AdminController.getSettings);
adminRoutes.put('/settings', AdminController.updateSettings);
