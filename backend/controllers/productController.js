import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/ProductModel.js';
import csv from 'csv-parser';
import fs from 'fs';

const uploadFile = asyncHandler( async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  const results = [];

  const fileStream = fs.createReadStream(req.file.path);

  fileStream
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        const insertedData = await Product.insertMany(results);
       
        fs.unlinkSync(req.file.path); // Remove the CSV file after processing
        return res.status(200).json({ message: 'File uploaded successfully!', data: insertedData });
      } catch (err) {
        return res.status(500).send(err.message);
      }
    });
});
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const addProduct = asyncHandler( async (req, res) => {
  // Check if all required fields are present
  const { Reference, Libelle, Categorie, Montant, Quantite, CategorieID, PtsFids, Prix } = req.body;
  if (!Reference || !Libelle || !Categorie || !Montant || !Quantite || !CategorieID || !PtsFids || !Prix || !req.file) {
    res.status(400);
    throw new Error("All fields are required, including the img");
  }

  // Check if the reference already exists
  const existingProduct = await Product.findOne({ Reference });
  if (existingProduct) {
    res.status(400);
    throw new Error("Reference already exists");
  }

  // Create a new product instance
  const newProduct = new Product({
    Reference,
    Image: req.file.path, // Save the file path of the uploaded img
    Libelle,
    Categorie,
    Montant,
    Quantite,
    CategorieID,
    PtsFids,
    Prix
  });

  // Save the product to the database
  await newProduct.save();

  res.status(201).json({ message: "Product added successfully" });
});

const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const { Reference, Libelle, Categorie, Montant, Quantite, CategorieID, PtsFids, Prix } = req.body;
  
  // Check if all required fields are present
  if (!Reference || !Libelle || !Categorie || !Montant || !Quantite || !CategorieID || !PtsFids || !Prix) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Find the product by ID
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check if the provided reference already exists for another product
  const existingProduct = await Product.findOne({ Reference });
  if (existingProduct && existingProduct._id.toString() !== productId) {
    res.status(400);
    throw new Error("Reference already exists");
  }

  // Update product fields
  product.Reference = Reference;
  product.Libelle = Libelle;
  product.Categorie = Categorie;
  product.Montant = Montant;
  product.Quantite = Quantite;
  product.CategorieID = CategorieID;
  product.PtsFids = PtsFids;
  product.Prix = Prix;

  // If an image is included in the request, update the image
  if (req.file) {
    product.Image = req.file.filename;
  }

  // Save the updated product
  await product.save();

  res.status(200).json({ message: "Product updated successfully" });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const deleteProduct = await Product.findById(req.params.id);
  
    if (deleteProduct) {

    await Product.deleteOne({ _id: deleteProduct.id });
    res.json({ message: 'Produit supprimé' });
  } else {
    res.status(404);
    throw new Error('Produit introuvable');
  }

});
const getProductById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    // NOTE: this will run if a valid ObjectId but no product was found
    // i.e. product may be null
    res.status(404);
    throw new Error('product not found');
  }
});
export { uploadFile,getProducts,addProduct,updateProduct,deleteProduct,getProductById};