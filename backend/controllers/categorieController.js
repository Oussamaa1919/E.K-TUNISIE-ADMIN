import asyncHandler from '../middleware/asyncHandler.js';
import Categorie from '../models/categorieModel.js';



const getCategories = asyncHandler(async (req, res) => {
  const categories = await Categorie.find({});
  res.json(categories);
});

const addNewCategorie = asyncHandler( async (req, res) => {
  // Check if all required fields are present
  const { nom, categorieId,pourcentage} = req.body;
  if (!nom || !categorieId || !pourcentage) {
    res.status(400);
    throw new Error("All fields are required");
  }
  // Create a new product instance
  const newcategorie = new Categorie({
    nom,
    categorieId,
    pourcentage,
    
  });
  // Save the product to the database
  await newcategorie.save();
  res.status(201).json({ message: "Categorie added successfully" });
});

const updateCatgeorie = asyncHandler(async (req, res) => {
  const catId = req.params.id;
  const { nom, categorieId,pourcentage} = req.body;
  if (!nom || !categorieId || !pourcentage) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Find the product by ID
  const categorie = await Categorie.findById(catId);
  if (!categorie) {
    res.status(404);
    throw new Error("Categorie not found");
  }

  

  // Update product fields
  categorie.nom = nom;
  categorie.categorieId = categorieId;
  categorie.pourcentage = pourcentage;
 
  // Save the updated product
  await categorie.save();

  res.status(200).json({ message: "categorie updated successfully" });
});

const deleteCategorie = asyncHandler(async (req, res) => {
  const categorie = await Categorie.findById(req.params.id);
  
    if (categorie) {

    await Categorie.deleteOne({ _id: categorie.id });
    res.json({ message: 'Categorie supprimé' });
  } else {
    res.status(404);
    throw new Error('Categorie introuvable');
  }

});
const getCategorieById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const categorie = await Categorie.findById(req.params.id);
  if (categorie) {
    return res.json(categorie);
  } else {
    // NOTE: this will run if a valid ObjectId but no product was found
    // i.e. product may be null
    res.status(404);
    throw new Error('categorie not found');
  }
});
export { getCategorieById,deleteCategorie,updateCatgeorie,addNewCategorie,getCategories};