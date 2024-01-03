import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
 
  Reference: {
    type: String,
    unique: true
  },
  Image: String,
  Libelle: String,
  Categorie: String,
  Montant: String,
  Quantite: String,
  CategorieID: String,
  PtsFids:String,
  Prix:String,
  
});
const Product = mongoose.model('Product', ProductSchema);

export default Product;