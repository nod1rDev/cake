import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/Product.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const cors = require('cors');
app.use(cors({
  origin: 'https://cake-1-c7u4.onrender.com',
}));

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/', authRoutes);

app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ success: false, msg: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to DB', error);
        process.exit(1);
    });
