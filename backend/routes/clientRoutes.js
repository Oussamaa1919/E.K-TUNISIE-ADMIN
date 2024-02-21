import express from 'express';
import {
  getClients
  
} from '../controllers/clientController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/').get(getClients);

export default router;
