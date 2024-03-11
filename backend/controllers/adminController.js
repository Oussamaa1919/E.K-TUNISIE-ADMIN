import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/genrerateToken.js';
import Admin from '../models/adminModel.js';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import {sendPasswordEmail} from './emailController.js'
// Import bcrypt for password hashing
// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id);
    
    res.json({
      _id: admin._id,
      firtsname: admin.firstname,
      lastname: admin.lastname,
      email: admin.email,
      phone: admin.phone,
      type: admin.type,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/admin/register
// @access  Public

const registerAdmin = asyncHandler(async (req, res) => {
  const validationRules = [
    check('email', 'Please include a valid email').isEmail(),
    check('firstname', 'Firstname is required').notEmpty(),
    check('lastname', 'Lastname is required').notEmpty(),
    check('password', 'Password must be at least 8 characters').isLength({
      min: 8,
    }),
    check(
      'password',
      'Password must contain at least one uppercase letter'
    ).matches(/[A-Z]/),
    check(
      'password',
      'Password must contain at least one special character'
    ).matches(/[$&+,:;=?@#|'<>.^*()%!-]/),
    check(
      'phone',
      'Please enter a valid phone number with exactly 8 numbers'
    ).matches(/^\d{8}$/),
  ];
  await Promise.all(
    validationRules.map((validationRule) => validationRule.run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { phone, lastname, firstname, email, password } = req.body;

  const userExistsByEmail = await Admin.findOne({ email });
  const userExistsByPhone = await Admin.findOne({ phone });

  if (userExistsByEmail) {
    res.status(400);
    throw new Error('Admin already exists');
  }
  if (userExistsByPhone) {
    res.status(400);
    throw new Error('Phone number is already in use');
  }

  const admin = await Admin.create({
    phone,
    firstname,
    lastname,
    type: 'admin',
    email,
    password,
  });

  if (admin) {
    generateToken(res, admin._id);

    res.status(201).json({
      _id: admin._id,
      firstname: admin.firstname,
      lastname: admin.lastname,
      email: admin.email,
      phone: admin.phone,
      type: admin.type,
    });
  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
});

// @desc    Get user by ID
// @route   GET /api/admin/:id
// @access  Private/Admin
const getAdminById = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id).select('-password');

  if (admin) {
    res.json(admin);
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});
// @desc    Update Password
// @route   Put /api/admin/password
// @access  Private/Admin

const updatePassword = asyncHandler(async (req, res) => {
  const validationRules = [
    check('currentPassword', 'Current password is required').exists(),
    check('newPassword', 'Password must be at least 8 characters').isLength({
      min: 8,
    }),
    check(
      'newPassword',
      'Password must contain at least one uppercase letter'
    ).matches(/[A-Z]/),
    check(
      'newPassword',
      'Password must contain at least one special character'
    ).matches(/[$&+,:;=?@#|'<>.^*()%!-]/),
  ];

  const { currentPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.admin.id);

  const isMatch = await bcrypt.compare(currentPassword, admin.password);

  if (!isMatch) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'Invalid current password' }] });
  }

  await Promise.all(
    validationRules.map((validationRule) => validationRule.run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  (admin.password = newPassword), await admin.save();

  res.json({ msg: 'Password updated successfully' });
});

// @desc    Add membre
// @route   Post /api/admin/add-membre
// @access  Private/Admin

const addMember = asyncHandler(async (req, res) => {
  const validationRules = [
    check(
      'phone',
      'Please enter a valid phone number with exactly 8 numbers'
    ).matches(/^\d{8}$/),
    check('email', 'Please include a valid email').isEmail(),
    check('firstname', 'Firstname is required').notEmpty(),
    check('lastname', 'Lastname is required').notEmpty(),
    check('password', 'Password must be at least 8 characters').isLength({
      min: 8,
    }),
    check(
      'password',
      'Password must contain at least one uppercase letter'
    ).matches(/[A-Z]/),
    check(
      'password',
      'Password must contain at least one special character'
    ).matches(/[$&+,:;=?@#|'<>.^*()%!-]/),
  ];

  // Run validation rules and collect errors
  await Promise.all(
    validationRules.map((validationRule) => validationRule.run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const { phone, firstname, lastname, type, email, password } = req.body;

  const memberByEmail = await Admin.findOne({ email });
  const memberByPhone = await Admin.findOne({ phone });

  if (memberByEmail) {
    throw new Error ( 'Email is already in use' );
  }

  if (memberByPhone) {
    
      throw new Error('Phone number is already in use' );
  }

  const member = new Admin({
    phone,
    firstname,
    lastname,
    type: 'assistant',
    email,
    password,
  });

  await member.save();
  return res.status(201).json(member);
});

// @desc    Update Profile
// @route   Put /api/admin
// @access  Private/Admin

const updateAdmin = asyncHandler(async (req, res) => {
  const adminId = req.admin.id; // Logged-in admin's ID
  const updatedEmail = req.body.email;
  const updatedPhone = req.body.phone;
  const existingAdminWithEmail = await Admin.findOne({
    email: updatedEmail,
    _id: { $ne: adminId }, // Exclude the current admin's ID
  });

  if (existingAdminWithEmail) {
    return res.status(400).json({ message: 'This email is already taken' });
  }

  const existingAdminWithPhone = await Admin.findOne({
    phone: updatedPhone,
    _id: { $ne: adminId }, // Exclude the current admin's ID
  });

  if (existingAdminWithPhone) {
    return res.status(400).json({ message: 'This phone is already taken' });
  }

  const validationRules = [
    check('email', 'Please include a valid email').isEmail(),
    check('firstname', 'Firstname is required').notEmpty(),
    check('lastname', 'Lastname is required').notEmpty(),
    check('password', 'Password must be at least 8 characters').isLength({
      min: 8,
    }),
    check(
      'password',
      'Password must contain at least one uppercase letter'
    ).matches(/[A-Z]/),
    check(
      'password',
      'Password must contain at least one special character'
    ).matches(/[$&+,:;=?@#|'<>.^*()%!-]/),
    // Add more validation rules here
  ];

  // Run validation rules and collect errors
  await Promise.all(
    validationRules.map((validationRule) => validationRule.run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (req.body.password) {
    updatePassword = req.body.password;
  }

  const updateFields = {
    phone: updatedPhone,
    email: updatedEmail,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password:updatePassword,
    
  };

  const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateFields, {
    new: true,
  });

  if (!updatedAdmin) {
    return res.status(404).json({ message: 'Admin not found' });
  }

  return res.json(updatedAdmin);
});


// @desc    Delete Admin
// @route   Delete /api/admin/id
// @access  Private/Admin
const deleteAdmin = asyncHandler(async (req, res) => {
  const deletedadmin = await Admin.findById(req.params.id);
  
    if (deletedadmin) {

    await Admin.deleteOne({ _id: deletedadmin.id });
    res.json({ message: 'Admin removed' });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }

});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({}).select('-password');;
  res.json(admins);
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutAdmin = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};


function generateRandomPassword() {
  const specialChars = '!@#$%^&*()_+';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const newPassword = [];

  // Generate at least one special character and one uppercase character
  newPassword.push(specialChars[Math.floor(Math.random() * specialChars.length)]);
  newPassword.push(uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]);

  // Generate the remaining characters (at least 6) as a combination of uppercase, lowercase, and special characters
  while (newPassword.length < 8) {
    const charSet = uppercaseChars + lowercaseChars + specialChars;
    newPassword.push(charSet[Math.floor(Math.random() * charSet.length)]);
  }

  // Shuffle the password characters to make it random
  for (let i = newPassword.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newPassword[i], newPassword[j]] = [newPassword[j], newPassword[i]];
  }

  return newPassword.join('');
}
const resetAdminPassword = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;

    // Generate a new random password
    const newPassword = generateRandomPassword();
    console.log('New Password:', newPassword); // Log the generated password

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the admin's password in the database
    const admin = await Admin.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    if (!admin) {
      throw new Error('Admin not found');
    }

    // Send email with the new password
    await sendPasswordEmail(email, newPassword);

    res.status(200).json({ success: true, message: 'Password reset successful. Check your email for the new password.' });
  } catch (error) {
    // Log any errors that occur during the password reset process
    console.error('Error resetting password:', error);
    // Pass the error to the error handling middleware
    return next(error);
  }
});

export { authUser, registerAdmin, getAdminById, updatePassword, addMember, updateAdmin, deleteAdmin,getAdmins,logoutAdmin,resetAdminPassword};
