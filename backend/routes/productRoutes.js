import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/storage.js'
import checkObjectId from '../middleware/checkObjectId.js';
import {
  uploadFile,getProducts,addProduct,updateProduct,deleteProduct,getProductById
} from '../controllers/productController.js';
const router = express.Router();



router.route('/:id').put(checkObjectId,upload.single('Image'),updateProduct).delete(checkObjectId,deleteProduct).get(getProductById);
router.route('/').get(getProducts).post(upload.single('file'),uploadFile);
router.route('/add').post(upload.single('Image'),addProduct);
export default router;
