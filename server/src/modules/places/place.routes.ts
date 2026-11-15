import { Router } from 'express';
import { PlaceController } from './place.controller';

const router = Router();

router.get('/categories', PlaceController.getCategories);
router.get('/search', PlaceController.searchSuggestions);
router.get('/nearby', PlaceController.getNearby);
router.get('/', PlaceController.getAll);
router.get('/:id', PlaceController.getById);

export default router;
