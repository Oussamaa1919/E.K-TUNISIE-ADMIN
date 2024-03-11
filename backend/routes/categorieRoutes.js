import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  getCategorieById,deleteCategorie,updateCatgeorie,addNewCategorie,getCategories
} from '../controllers/categorieController.js';
const router = express.Router();



router.route('/:id').put(checkObjectId,updateCatgeorie).delete(checkObjectId,deleteCategorie).get(getCategorieById);
router.route('/').get(getCategories);
router.route('/add').post(addNewCategorie);
export default router;
