import asyncHandler from '../middleware/asyncHandler.js';
import Promo from '../models/promoModel.js';



const getPromos = asyncHandler(async (req, res) => {
  const promos = await Promo.find({});
  res.json(promos);
});

const addNewPromo = asyncHandler( async (req, res) => {
  // Check if all required fields are present
  const { titre, nouveauPrix,dateFin,discount} = req.body;
  if (!titre || !nouveauPrix || !dateFin || !discount||!req.file) {
    res.status(400);
    throw new Error("All fields are required, including the img");
  }
  // Create a new product instance
  const newpromo = new Promo({
    titre,
    image: req.file.path, 
    nouveauPrix,
    dateFin,
    discount
  });
  // Save the product to the database
  await newpromo.save();
  res.status(201).json({ message: "Promo added successfully" });
});

const updatePromo = asyncHandler(async (req, res) => {
  const promoId = req.params.id;
  const { titre, nouveauPrix,dateFin,discount } = req.body;
  
  // Check if all required fields are present
  if (!titre || !nouveauPrix || !dateFin || !discount||!req.file) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Find the product by ID
  const promo = await Promo.findById(promoId);
  if (!promo) {
    res.status(404);
    throw new Error("Promo not found");
  }

  

  // Update product fields
  promo.titre = titre;
  promo.nouveauPrix = nouveauPrix;
  promo.discount = discount;
  promo.dateFin=dateFin;
  

  // If an image is included in the request, update the image
  if (req.file) {
    promo.image = req.file.filename;
  }

  // Save the updated product
  await promo.save();

  res.status(200).json({ message: "Promo updated successfully" });
});

const deletePromo = asyncHandler(async (req, res) => {
  const promo = await Promo.findById(req.params.id);
  
    if (promo) {

    await Promo.deleteOne({ _id: promo.id });
    res.json({ message: 'Promo supprimé' });
  } else {
    res.status(404);
    throw new Error('Promo introuvable');
  }

});
const getPromoById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const promo = await Promo.findById(req.params.id);
  if (promo) {
    return res.json(promo);
  } else {
    // NOTE: this will run if a valid ObjectId but no product was found
    // i.e. product may be null
    res.status(404);
    throw new Error('promo not found');
  }
});
export { getPromos,getPromoById,deletePromo,updatePromo,addNewPromo};