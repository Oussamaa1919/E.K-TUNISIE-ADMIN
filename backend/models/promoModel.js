import mongoose from 'mongoose';

const promoSchema = new mongoose.Schema({
 
  titre: String,
  discount: String,
  nouveauPrix: String,
  image: String,
  dateDebut:{
    type: Date,
    default: Date.now
  }, 
  dateFin:Date,

});
const promo = mongoose.model('promo', promoSchema);

export default promo;