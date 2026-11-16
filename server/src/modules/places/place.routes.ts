import { Router } from 'express';
import { PlaceController } from './place.controller';
import { optionalAuthenticate } from '../../middleware/auth.middleware';

const router = Router();

router.get('/categories', PlaceController.getCategories);
router.get('/search', PlaceController.searchSuggestions);
router.get('/nearby', optionalAuthenticate, PlaceController.getNearby);
router.get('/', optionalAuthenticate, PlaceController.getAll);
router.get('/:id', optionalAuthenticate, PlaceController.getById);

export default router;
