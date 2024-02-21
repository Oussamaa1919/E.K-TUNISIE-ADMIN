import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
 
  phone: {
    type: String,
    unique: true
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    
    unique:true,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
  },
  dateofbirth: {
    type: Date,

  }, 
  date: {
    type: Date,
    default: Date.now
  }, 
  verified: {
    type: Boolean,
    default: false
  },
  codeVerification: {
    type: String,
  },
  codeVerificationExpires: {
    type: Date, 
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
  },
  
  
  
  
  
});

const User = mongoose.model('user', UserSchema);
export default User;