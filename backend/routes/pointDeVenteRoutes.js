import express from 'express';
import {
  getPointDeVentes,
  addPointDeVente,
  deletePointdeVente,
  updatePointDeVente,
  getPdvById
  
} from '../controllers/pointDeVenteController.js';
import { protect } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();
router.route('/addpointdevente').post(addPointDeVente);



router.route('/').get(getPointDeVentes);
router.route('/:id').delete(checkObjectId,deletePointdeVente);
router.route('/:id').put(checkObjectId,updatePointDeVente).get(getPdvById) ;

export default router;
