import asyncHandler from '../middleware/asyncHandler.js';
import Calcul from '../models/calculModel.js';



const getCalcul = asyncHandler(async (req, res) => {
  const calcul = await Calcul.findOne();
  if (!calcul) {
    return res.status(404).json({ message: 'No calcul found' });
  }
  res.json(calcul);
});

const addNewCalcul = asyncHandler( async (req, res) => {
  const { cac, bonAchat} = req.body;
  if (!cac || !bonAchat ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const cpoint = cac / bonAchat;


  let calcul = await Calcul.findOne();

    if (!calcul) {
      
      calcul = new Calcul({
        cac,
        bonAchat,
        cpoint
       

      });
    } else {
      
      calcul.cac = req.body.cac;
      calcul.bonAchat = req.body.bonAchat;
      calcul.cpoint = cpoint;

    }
    await calcul.save();

    res.json(calcul);
});





export { getCalcul,addNewCalcul};