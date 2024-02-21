import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';



const getClients = asyncHandler(async (req, res) => {
  const clients = await User.find({}).select('-password');;
  res.json(clients);
});

export { getClients};
