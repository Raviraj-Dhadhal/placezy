import { Router } from 'express';
import { PlaceController } from './place.controller';

const router = Router();

router.get('/', PlaceController.getAll);
router.get('/:id', PlaceController.getById);

export default router;
