// routes/cart.js
import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { auth } from '../middleware/auth.js'; // your auth middleware
import User from '../models/User.js';

const router = express.Router();

// POST /api/cart
router.post("/", auth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // create new cart
            cart = new Cart({
                user: userId,
                items: [{ product: productId, quantity }],
            });
        } else {
            // check if product already exists
            const itemIndex = cart.items.findIndex(
                (item) => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                // ✅ product already in cart → update quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // add new product
                cart.items.push({ product: productId, quantity });
            }
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


router.get("/", auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id })
            .populate("items.product");

        if (!cart) {
            return res.json([]); // return empty array if no cart
        }

        res.json(cart.items);
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).json({ message: "Server error fetching cart" });
    }
});

// PUT /api/cart/:productId
router.put("/:productId", auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Product not in cart" });
        }

        // ✅ set new quantity (not just +=)
        cart.items[itemIndex].quantity = quantity;

        await cart.save();
        await cart.populate("items.product");

        res.json(cart.items);
    } catch (err) {
        console.error("Error updating quantity:", err);
        res.status(500).json({ message: "Server error updating cart" });
    }
});


export default router;
