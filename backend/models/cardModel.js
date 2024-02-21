const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  cardNumber: {
    type: String,
    
    unique: true
  },
  qrCode: {
    type: String,
    unique: true, 
  },
  type: String,
  cagnotte: {
    bon_achat: {
      type: String,
      default: "0"
    },
    soldeptsfid: {
      type: String,
      default: "0"
    }
  },
  
});

module.exports = mongoose.model('Card', CardSchema);