import Favorite from "../models/Favorite.js";

// Add to favorites
export const addFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: "Product ID required" });

    const favorite = await Favorite.findOneAndUpdate(
      { user: req.user.id, product: productId },
      { user: req.user.id, product: productId },
      { new: true, upsert: true } // create if not exist
    ).populate("product");

    res.json(favorite);
  } catch (err) {
    res.status(500).json({ message: "Error adding to favorites", error: err.message });
  }
};

// Remove from favorites
export const removeFavorite = async (req, res) => {
  try {
    const { productId } = req.params;

    await Favorite.findOneAndDelete({ user: req.user.id, product: productId });

    res.json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: "Error removing favorite", error: err.message });
  }
};

// Get all favorites for logged-in user
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).populate("product");
    res.json(favorites.map(f => f.product)); // return only products
  } catch (err) {
    res.status(500).json({ message: "Error fetching favorites", error: err.message });
  }
};
