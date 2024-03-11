import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/storage.js'
import checkObjectId from '../middleware/checkObjectId.js';
import {
  getVenteFlashById,
  deleteVenteFlash,
  updateVenteFlash,
  addNewVenteFlash,
  getVenteFlash
} from '../controllers/venteFlashController.js';
const router = express.Router();



router.route('/:id').put(checkObjectId,upload.single('image'),updateVenteFlash).delete(checkObjectId,deleteVenteFlash).get(getVenteFlashById);
router.route('/').get(getVenteFlash);
router.route('/add').post(upload.single('image'),addNewVenteFlash);
export default router;
