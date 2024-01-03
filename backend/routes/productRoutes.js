import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

import {
  uploadFile,
} from '../controllers/productController.js';
const router = express.Router();

router.route('/upload').post(protect,uploadFile);

export default router;
