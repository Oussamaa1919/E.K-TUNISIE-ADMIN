import asyncHandler from '../middleware/asyncHandler.js';
import PointDeVente from '../models/pointDeVenteModel.js';
import { check, validationResult } from 'express-validator';


const addPointDeVente = asyncHandler(async (req, res) => {
  const validationRules = [
   
    check('name', 'Name is required').notEmpty(),
    check('address', 'Adress is required').notEmpty(),
    check('rhmanager', 'Rhmanager is required').notEmpty(),
    
  ];

  // Run validation rules and collect errors
  await Promise.all(
    validationRules.map((validationRule) => validationRule.run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const { name, address, rhmanager } = req.body;

 

  const pointdevente = new PointDeVente({
    name,
    address,
    rhmanager,
   
  });

  await pointdevente.save();
  return res.status(201).json(pointdevente);
});


const getPointDeVentes = asyncHandler(async (req, res) => {
  const pointdeventes = await PointDeVente.find({});
  res.json(pointdeventes);
});


const deletePointdeVente = asyncHandler(async (req, res) => {
  const deletedpdv = await PointDeVente.findById(req.params.id);
  
    if (deletedpdv) {

    await PointDeVente.deleteOne({ _id: deletedpdv.id });
    res.json({ message: 'Point de vente supprimée' });
  } else {
    res.status(404);
    throw new Error('Point de vente introuvable');
  }

});
const updatePointDeVente= asyncHandler(async (req, res) => {
  const pdvId = await PointDeVente.findById(req.params.id);


  const validationRules = [
   
    check('name', 'Name is required').notEmpty(),
    check('address', 'Adress is required').notEmpty(),
    check('rhmanager', 'Rhmanager is required').notEmpty(),
    
  ];

  // Run validation rules and collect errors
  await Promise.all(
    validationRules.map((validationRule) => validationRule.run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updateFields = {
   
    name: req.body.name,
    address: req.body.address,
    rhmanager: req.body.rhmanager,
    // Add more fields to update here
  };

  const updatedPointDeVente = await PointDeVente.findByIdAndUpdate(pdvId, updateFields, {
    new: true,
  });

  if (!updatedPointDeVente) {
    return res.status(404).json({ message: 'Point de vente introuvable' });
  }

  return res.json(updatedPointDeVente);
});


const getPdvById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const pdv = await PointDeVente.findById(req.params.id);
  if (pdv) {
    return res.json(pdv);
  } else {
    // NOTE: this will run if a valid ObjectId but no pdv was found
    // i.e. pdv may be null
    res.status(404);
    throw new Error('pdv not found');
  }
});

export { addPointDeVente,deletePointdeVente,getPointDeVentes,updatePointDeVente,getPdvById};
