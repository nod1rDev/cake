import express from 'express';
import Cart from '../models/Cart.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

const populateCart = async (cart) => {
    if (!cart || cart.items.length === 0) return [];

    await cart.populate({
        path: 'items.product',
        select: 'name price image createdBy',
        populate: { path: 'createdBy', select: 'name' },
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

        // ✅ Fetch cart WITHOUT populating yet
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Cart doesn't exist yet, create it
            cart = new Cart({
                user: userId,
                items: [{ product: productId, quantity: qty }],
            });
            await cart.save();

            // Populate after saving
            const populatedItems = await populateCart(cart);
            return res.json(populatedItems);
        }

        // ✅ Check if product is already in cart
        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            // Product exists → increment quantity
            cart.items[itemIndex].quantity += qty;
        } else {
            // Product not in cart → add new
            cart.items.push({ product: productId, quantity: qty });
        }

        // Save cart
        await cart.save();

        // Populate after saving
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
                select: 'name price image createdBy',
                populate: { path: 'createdBy', select: 'name' },
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

        if (quantity === undefined) {
            return res.status(400).json({ message: "Quantity is required" });
        }

        const qty = Number(quantity);
        if (qty < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        // Fetch cart without populating
        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );
        if (itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

        cart.items[itemIndex].quantity = qty;
        await cart.save();

        // Return minimal data only
        const minimalItems = cart.items.map(item => ({
            product: item.product,
            quantity: item.quantity,
        }));

        res.json(minimalItems);

    } catch (err) {
        console.error("❌ Error updating quantity:", err);
        res.status(500).json({ message: "Server error updating cart", error: err.message });
    }
});

router.delete("/:productId", auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        let cart = await Cart.findOne({ user: userId })
            .populate({
                path: 'items.product',
                select: 'name price image createdBy',
                populate: { path: 'createdBy', select: 'name' },
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