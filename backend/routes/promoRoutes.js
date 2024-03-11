import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/storage.js'
import checkObjectId from '../middleware/checkObjectId.js';
import {
  getPromos,getPromoById,deletePromo,updatePromo,addNewPromo
} from '../controllers/promoController.js';
const router = express.Router();



router.route('/:id').put(checkObjectId,upload.single('image'),updatePromo).delete(checkObjectId,deletePromo).get(getPromoById);
router.route('/').get(getPromos);
router.route('/add').post(upload.single('image'),addNewPromo);
export default router;
