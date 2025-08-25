import React, { useMemo, useState } from 'react';
import './Card.css';
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart, FaHeart, FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/User.js';
import { useCartStore } from '../store/Cart.js';
import toast from "react-hot-toast";

const Card = ({ product }) => {
    const navigate = useNavigate();
    const { user, token, favorites, addFavorite, removeFavorite } = useUserStore();
    const { cart, addToCart, removeFromCart, isInCart, getCartItemQuantity } = useCartStore();

    const [isAdding, setIsAdding] = useState(false);

    // Add null/undefined checks for the product
    if (!product) {
        return (
            <div className="specialist product_card loading">
                <div className="loading-placeholder">
                    <div className="loading-image"></div>
                    <div className="loading-text"></div>
                    <div className="loading-text short"></div>
                </div>
            </div>
        );
    }

    // Safe access to product properties with fallbacks
    const productId = product?._id || '';
    const productName = product?.name || 'Unnamed Product';
    const bakerName = product?.createdBy?.name || 'Unknown Baker';
    const ratingAverage = product?.rating?.average || 0;
    const ratingCount = product?.rating?.count || 0;
    const price = product?.price || 0;

    // Use the store methods with safe productId
    const itemInCart = isInCart(productId);
    const cartQuantity = getCartItemQuantity(productId);

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (!user || !token) return toast.error("Please log in to add to cart.");

        setIsAdding(true);

        try {
            if (itemInCart) {
                removeFromCart(productId, token);
                toast.success(`${productName} removed from cart ❌`);
            } else {
                await addToCart(product, token, 1);
                toast.success(`${productName} added to cart ✅`);
            }
        } catch (error) {
            console.error("Cart operation failed:", error);
            toast.error("Failed to update cart");
        } finally {
            setIsAdding(false);
        }
    };

    const handleCardClick = () => {
        if (productId) navigate(`/cakes/${productId}`);
    };

    const handleToggleFavorite = async (e) => {
        e.stopPropagation();
        if (!user || !token) {
            toast.error("Please log in to save favorites.");
            return;
        }

        const isCurrentlyFavorite = Array.isArray(favorites) && productId
            ? favorites.some(p => p?._id === productId)
            : false;

        try {
            if (isCurrentlyFavorite) {
                removeFavorite(productId);
                await fetch(`http://localhost:5000/api/favorites/${productId}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Removed from favorites");
            } else {
                addFavorite(product);
                await fetch(`http://localhost:5000/api/favorites`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    body: JSON.stringify({ productId })
                });
                toast.success("Added to favorites");
            }
        } catch (err) {
            // Revert UI on error
            if (isCurrentlyFavorite) {
                addFavorite(product);
            } else {
                removeFavorite(productId);
            }
            toast.error("Could not update favorites.");
            console.error("❌ Favorites error:", err);
        }
    };

    const isFavorite = Array.isArray(favorites) && productId
        ? favorites.some(p => p?._id === productId)
        : false;

    const imageUrl = product?.image?.startsWith("http")
        ? product.image
        : `http://localhost:5000${product?.image || "/placeholder.png"}`;

    return (
        <div className="specialist product_card" onClick={handleCardClick}>
            <button
                className="like product_like"
                onClick={handleToggleFavorite}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
                {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
            </button>

            <div className="specialist-photo">
                <img src={imageUrl} alt={productName} />
            </div>

            <div className="specialist-info">
                <h3>{productName}</h3>
                <span>by {bakerName}</span>

                <div className="rate_address rate_price">
                    <div className="rate">
                        <FaStar /> {ratingAverage.toFixed(1)} ({ratingCount} reviews)
                    </div>
                    <div className="price">${price}</div>
                </div>

                {Array.isArray(product?.sizes) && product.sizes.length > 0 && (
                    <p className="sizes">
                        Sizes: {product.sizes.map((s, i) => (
                            <span key={i}>
                                {s.label} (${s.price}){i < product.sizes.length - 1 && ", "}
                            </span>
                        ))}
                    </p>
                )}

                <div className="btns">
                    <button
                        onClick={handleAddToCart}
                        className={`view ${itemInCart ? "added" : ""}`}
                        disabled={isAdding}
                    >
                        <FaCartShopping />
                        {isAdding ? "Processing..." :
                            itemInCart ? `Added (${cartQuantity}) ✅` : "Add to cart"}
                    </button>
                    <Link to="/constructor" className="customize">Customize</Link>
                </div>
            </div>
        </div>
    );
};

export default Card;