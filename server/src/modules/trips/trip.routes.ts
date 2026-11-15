import { Router } from 'express';
import { TripController } from './trip.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, TripController.getAll);
router.post('/', authenticate, TripController.create);
router.get('/:id', authenticate, TripController.getById);
router.put('/:id/stops', authenticate, TripController.updateStops);
router.delete('/:id', authenticate, TripController.delete);

export default router;
