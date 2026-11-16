import { Router, Request, Response, NextFunction } from 'express';
import { ContactMessageModel } from './contact.model';
import { NotificationModel } from '../notifications/notification.model';
import { UserModel } from '../users/user.model';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { sendResponse } from '../../utils/apiResponse.util';

const router = Router();

// Public: Submit a contact message
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { fullName, email, subject, message } = req.body;
    if (!fullName || !email || !subject || !message) {
      sendResponse(res, 400, false, 'Please fill in all contact message fields.');
      return;
    }

    const doc = await ContactMessageModel.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      status: 'unread',
    });

    // Notify all admin accounts in their notifications list
    const admins = await UserModel.find({ role: 'admin' });
    if (admins.length > 0) {
      const adminNotifications = admins.map((admin) => ({
        userId: admin._id,
        title: `New Contact Inquiry from ${fullName.trim()}`,
        message: `Subject: "${subject.trim()}" - ${message.trim().slice(0, 100)}... (Email: ${email.trim()})`,
        type: 'system',
        read: false,
      }));
      await NotificationModel.insertMany(adminNotifications);
    }

    sendResponse(res, 201, true, 'Your inquiry has been received. Our team will contact you shortly.', doc);
  } catch (error) {
    next(error);
  }
});

// Admin: Get all contact messages
router.get('/', authenticate, authorize('admin'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const messages = await ContactMessageModel.find().sort({ createdAt: -1 });
    sendResponse(res, 200, true, 'Contact inquiries retrieved successfully', messages);
  } catch (error) {
    next(error);
  }
});

// Admin: Mark as read / update status
router.put('/:id/status', authenticate, authorize('admin'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.body;
    const updated = await ContactMessageModel.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );
    sendResponse(res, 200, true, 'Status updated', updated);
  } catch (error) {
    next(error);
  }
});

export default router;
