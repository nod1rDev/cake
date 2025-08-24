import express from "express";
import { addFavorite, removeFavorite, getFavorites } from "../controllers/Favorite.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// /api/favorites
router.get("/", auth, getFavorites);
router.post("/", auth, addFavorite);
router.delete("/:productId", auth, removeFavorite);

export default router;
