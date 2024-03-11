import mongoose from 'mongoose';

const venteFlashSchema = new mongoose.Schema({
 
  titre: String,
  prix: String,
  duree: String,
  image: String,
  date: {
    type: Date,
    default: Date.now
  }, 
  
});
const venteFlash = mongoose.model('venteFlash', venteFlashSchema);

export default venteFlash;