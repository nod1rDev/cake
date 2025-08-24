import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import productRoutes from './routes/Product.js';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/Category.js';
import cartRoutes from './routes/Cart.js';
import favoriteRoutes from './routes/Favorite.js';
// server.js or app.js


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/favorites", favoriteRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ success: false, msg: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

// Start server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ Failed to connect to DB', error);
        process.exit(1);
    });
