import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import cors from 'cors'

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import adminRoutes from './routes/adminRoutes.js';
import productRoutes from './routes/productRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import pointDeVenteRoutes from'./routes/pointDeVenteRoutes.js'
import venteFlashRoutes from './routes/venteFlashRoutes.js'
import promoRoutes  from "./routes/promoRoutes.js"
import categorieRoutes from './routes/categorieRoutes.js'
import calculRoutes from './routes/calculRoutes.js'
const port = process.env.PORT || 5000;


connectDB();

const app = express();
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));
app.use('/api/client',clientRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/product',productRoutes);
app.use('/api/pointdevente',pointDeVenteRoutes);
app.use('/api/venteflash',venteFlashRoutes);
app.use('/api/promo',promoRoutes);
app.use('/api/categorie',categorieRoutes);
app.use('/api/calcul',calculRoutes);




const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
