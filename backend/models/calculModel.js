import mongoose from 'mongoose';

const calculSchema = new mongoose.Schema({
 
  cac: String,
  bonAchat: String,
  cpoint: String,
 

});
const calcul = mongoose.model('calcul', calculSchema);

export default calcul;