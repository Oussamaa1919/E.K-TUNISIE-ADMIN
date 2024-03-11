import mongoose from 'mongoose';

const PointDeVenteSchema = mongoose.Schema(
  {

    name: {
      type: String,
    },
    address: {
      type: String,
    },
    rhmanager: {
      type: String,
      required: true,
    },
  }  
);
  


const PointDeVente = mongoose.model('pointdevente', PointDeVenteSchema);

export default PointDeVente;
