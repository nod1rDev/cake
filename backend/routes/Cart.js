import express from 'express';
import Cart from '../models/Cart.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

const populateCart = async (cart) => {
    if (!cart || cart.items.length === 0) return [];

    await cart.populate({
        path: 'items.product',
        select: 'name price image baker',
        populate: { path: 'baker', select: 'name' },
    });

    return cart.items;
};

router.post("/", auth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const qty = Number(quantity) || 1;

        let cart = await Cart.findOne({ user: userId })
            .populate({
                path: 'items.product',
                select: 'name price image baker',
                populate: { path: 'baker', select: 'name' },
            });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{ product: productId, quantity: qty }],
            });
            await cart.save();

            const populatedItems = await populateCart(cart);
            return res.json(populatedItems);
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.product._id.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += qty;
        } else {
            cart.items.push({ product: productId, quantity: qty });
        }

        await cart.save();

        const populatedItems = await populateCart(cart);
        res.json(populatedItems);

    } catch (err) {
        console.error("❌ Error adding to cart:", err);
        res.status(500).json({
            error: "Server error adding to cart",
            details: err.message
        });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id })
            .populate({
                path: 'items.product',
                select: 'name price image baker',
                populate: { path: 'baker', select: 'name' },
            });

        res.json(cart?.items || []);

    } catch (err) {
        console.error("❌ Error fetching cart:", err);
        res.status(500).json({
            message: "Server error fetching cart",
            error: err.message
        });
    }
});

router.put("/:productId", auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!quantity) {
            return res.status(400).json({ message: "Quantity is required" });
        }

        const qty = Number(quantity);

        if (qty < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        let cart = await Cart.findOne({ user: userId })
            .populate({
                path: 'items.product',
                select: 'name price image baker',
                populate: { path: 'baker', select: 'name' },
            });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(
            (item) => item.product._id.toString() === productId
        );

        if (itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

        cart.items[itemIndex].quantity = qty;
        await cart.save();

        const populatedItems = await populateCart(cart);
        res.json(populatedItems);

    } catch (err) {
        console.error("❌ Error updating quantity:", err);
        res.status(500).json({
            message: "Server error updating cart",
            error: err.message
        });
    }
});

router.delete("/:productId", auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        let cart = await Cart.findOne({ user: userId })
            .populate({
                path: 'items.product',
                select: 'name price image baker',
                populate: { path: 'baker', select: 'name' },
            });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item => item.product._id.toString() !== productId);

        if (cart.items.length === initialLength) {
            return res.json(cart.items);
        }

        await cart.save();

        const populatedItems = await populateCart(cart);
        res.json(populatedItems);

    } catch (err) {
        console.error("❌ Error deleting from cart:", err);
        res.status(500).json({
            message: "Server error deleting cart item",
            error: err.message
        });
    }
});

export default router;