import mongoose from 'mongoose';

const categorieSchema = new mongoose.Schema({
 
  nom: String,
  categorieId: String,
  pourcentage: String,
  

});
const categorie = mongoose.model('categorie', categorieSchema);

export default categorie;