import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/ProductModel.js';
import csv from 'csv-parser';
import fs from 'fs';
import { upload } from '../middleware/storage.js'

const uploadFile = asyncHandler(upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  const results = [];

  const fileStream = fs.createReadStream(req.file.path);

  fileStream
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        const insertedData = await Product.insertMany(results);
        console.log(results);
        fs.unlinkSync(req.file.path); // Remove the CSV file after processing
        return res.status(200).json({ message: 'File uploaded successfully!', data: insertedData });
      } catch (err) {
        return res.status(500).send(err.message);
      }
    });
});

export { uploadFile };