import express from 'express';
import {
  authUser,
  registerAdmin,
  getAdminById,
  updatePassword,
  addMember,
  updateAdmin,
  deleteAdmin
  
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();
router.route('/register').post(registerAdmin);
router.post('/login', authUser);
router.route('/:id').get(getAdminById);
router.route('/password').put(protect,updatePassword);
router.route('/add-membre').post(protect,addMember);
router.route('/').put(protect,updateAdmin);
router.route('/:id').delete(protect,checkObjectId,deleteAdmin);
export default router;
