import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/Product.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();

const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Uploads folder created at:', uploadDir);
} else {
    console.log('Uploads folder already exists at:', uploadDir);
}

app.use('/uploads', express.static(uploadDir));

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
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
