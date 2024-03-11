import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

import {
 getCalcul,addNewCalcul
} from '../controllers/calculController.js';
const router = express.Router();



router.route('/').put(addNewCalcul);
router.route('/').get(getCalcul);
export default router;
