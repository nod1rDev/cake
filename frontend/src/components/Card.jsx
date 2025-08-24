import React from 'react';
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
    const { cart, addToCart, removeFromCart } = useCartStore();

    // compute isInCart directly from cart
    const isInCart = Array.isArray(cart) && cart.some(item => item.product._id === product._id);

    const handleCardClick = () => {
        if (product?._id) navigate(`/cakes/${product._id}`);
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (!user || !token) return toast.error("Please log in to add to cart.");

        try {
            if (isInCart) {
                removeFromCart(product._id, token); // fire & forget
                toast.success(`${product.name} removed from cart ❌`);
            } else {
                addToCart(product._id, token, 1); // fire & forget
                toast.success(`${product.name} added to cart ✅`);
            }
        } catch (err) {
            toast.error("Could not update cart.");
            console.error(err);
        }
    };


    const handleToggleFavorite = async (e) => {
        e.stopPropagation();
        if (!user || !token) return toast.error("Please log in to save favorites.");

        const isCurrentlyFavorite = Array.isArray(favorites) && favorites.some(p => p?._id === product?._id);

        if (isCurrentlyFavorite) removeFavorite(product._id);
        else addFavorite(product);

        try {
            if (isCurrentlyFavorite) {
                await fetch(`http://localhost:5000/api/favorites/${product._id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
                toast.success("Removed from favorites");
            } else {
                await fetch(`http://localhost:5000/api/favorites`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ productId: product._id }) });
                toast.success("Added to favorites");
            }
        } catch (err) {
            if (isCurrentlyFavorite) addFavorite(product);
            else removeFavorite(product._id);
            toast.error("Could not update favorites.");
            console.error("❌ Favorites error:", err);
        }
    };

    const isFavorite = Array.isArray(favorites) && favorites.some(p => p?._id === product?._id);

    const imageUrl = product?.image?.startsWith("http") ? product.image : `http://localhost:5000${product.image || "/placeholder.png"}`;

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
                <img src={imageUrl} alt={product?.name || "Cake"} />
            </div>

            <div className="specialist-info">
                <h3>{product?.name || "No name"}</h3>
                <span>by {product?.createdBy?.name || 'Unknown Baker'}</span>

                <div className="rate_address rate_price">
                    <div className="rate">
                        <FaStar /> {product?.rating?.average ?? 0} ({product?.rating?.count ?? 0} reviews)
                    </div>
                    <div className="price">${product?.price ?? 0}</div>
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
                        className={`view ${isInCart ? "added" : ""}`}
                    >
                        <FaCartShopping /> {isInCart ? "Added ✅" : "Add to cart"}
                    </button>
                    <Link to="/constructor" className="customize">Customize</Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
