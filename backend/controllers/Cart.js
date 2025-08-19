import User from '../models/User.js';

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!productId || !quantity) {
        return res.status(400).json({ error: "Product ID and quantity are required" });
    }

    try {
        const user = await User.findById(userId).populate("cart.product");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingItem = user.cart.find(
            item => item.product._id.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }

        await user.save();
        await user.populate("cart.product");

        res.json({ success: true, cart: user.cart });
    } catch (err) {
        console.error("Error adding to cart:", err);
        res.status(500).json({ error: "Failed to add to cart" });
    }
};
