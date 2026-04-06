import { Router } from 'express';
import { getPhotos, uploadPhoto } from '../controllers/photoController';

const router = Router();

router.get('/', getPhotos);
router.post('/', uploadPhoto);

export default router;