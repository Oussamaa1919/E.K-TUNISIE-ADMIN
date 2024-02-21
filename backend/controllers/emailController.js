import asyncHandler from '../middleware/asyncHandler.js';
import nodemailer from 'nodemailer';
import Admin from '../models/adminModel.js';

const sendPasswordEmail = asyncHandler(async (userEmail, NouveauMotDePasse) => {

  // Save the verification code in the user document
  const user = await Admin.findOneAndUpdate(
    { email: userEmail },
    { NouveauMotDePasse },
    { new: true }
  );

  if (!user) {
    throw new Error('User not found');
  }

  // NodeMailer setup (replace with your configuration)
  const transporter = nodemailer.createTransport({
    // Your SMTP settings
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'oussemathebridge@gmail.com',
      pass: 'mhdw eell dsin upxd',
    },
  });

  // Email content
  const mailOptions = {
    from: 'oussemathebridge@gmail.com',
    to: userEmail,
    subject: 'nouveau mot de passe',
    text: `votre nouveau mot de passe est :${NouveauMotDePasse}`,
  };

  // Sending the email
  await transporter.sendMail(mailOptions);
  console.log('mot de passe envoyé');
});

export { sendPasswordEmail };