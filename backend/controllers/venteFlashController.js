import asyncHandler from '../middleware/asyncHandler.js';
import VenteFlash from '../models/venteFlashModel.js';



const getVenteFlash = asyncHandler(async (req, res) => {
  const venteflashs = await VenteFlash.find({});
  res.json(venteflashs);
});

const addNewVenteFlash = asyncHandler( async (req, res) => {
  // Check if all required fields are present
  const { titre, prix, duree } = req.body;
  if (!titre || !prix || !duree || !req.file) {
    res.status(400);
    throw new Error("All fields are required, including the img");
  }
  // Create a new product instance
  const newventeflash = new VenteFlash({
    titre,
    image: req.file.path, 
    prix,
    duree,
  });
  // Save the product to the database
  await newventeflash.save();
  res.status(201).json({ message: "Vente Flash added successfully" });
});

const updateVenteFlash = asyncHandler(async (req, res) => {
  const venteflashId = req.params.id;
  const { titre, prix, duree } = req.body;
  
  // Check if all required fields are present
  if (!titre || !prix || !duree) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Find the product by ID
  const venteFlash = await VenteFlash.findById(venteflashId);
  if (!venteFlash) {
    res.status(404);
    throw new Error("vente Flash not found");
  }

  

  // Update product fields
  venteFlash.titre = titre;
  venteFlash.prix = prix;
  venteFlash.duree = duree;
  

  // If an image is included in the request, update the image
  if (req.file) {
    venteFlash.image = req.file.filename;
  }

  // Save the updated product
  await venteFlash.save();

  res.status(200).json({ message: "Venteflash updated successfully" });
});

const deleteVenteFlash = asyncHandler(async (req, res) => {
  const deleteVenteFlash = await VenteFlash.findById(req.params.id);
  
    if (deleteVenteFlash) {

    await VenteFlash.deleteOne({ _id: deleteVenteFlash.id });
    res.json({ message: 'VenteFlash supprimé' });
  } else {
    res.status(404);
    throw new Error('VenteFlash introuvable');
  }

});
const getVenteFlashById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const venteflash = await VenteFlash.findById(req.params.id);
  if (venteflash) {
    return res.json(venteflash);
  } else {
    // NOTE: this will run if a valid ObjectId but no product was found
    // i.e. product may be null
    res.status(404);
    throw new Error('venteflash not found');
  }
});
export { getVenteFlashById,deleteVenteFlash,updateVenteFlash,getVenteFlash,addNewVenteFlash};