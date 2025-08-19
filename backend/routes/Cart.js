import express from 'express';
import { addToCart } from '../controllers/Cart.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// POST /api/cart
router.post('/', auth, addToCart);

export default router;