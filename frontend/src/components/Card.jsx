import React from 'react';
import './Card.css';
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/User.js';
import axios from 'axios';
import { useCartStore } from '../store/Cart.js';

const Card = ({ product }) => {
    const navigate = useNavigate();
    const { user, token } = useUserStore();

    const handleCardClick = () => {
        if (product?._id) {
            navigate(`/cakes/${product._id}`); // navigation handled internally
        }
    };
    const { setCart } = useCartStore(); // create a Zustand store for cart

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (!user || !token) return;

        try {
            const res = await axios.post(
                'http://localhost:5000/api/cart',
                { productId: product._id, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(res.data); // update cart in frontend state
            alert('Product added to your cart!');
        } catch (err) {
            console.error(err);
            alert('Could not add product to cart.');
        }
    };


    return (
        <div className="specialist product_card" onClick={handleCardClick}>
            <button
                className="like product_like"
                onClick={(e) => e.stopPropagation()} // prevent card click
            >
                <FaRegHeart />
            </button>

            <div className="specialist-photo">
                {product?.image && (
                    <img
                        src={product.image.startsWith("http") ? product.image : `http://localhost:5000${product.image}`}
                        alt={product?.name || "Product"}
                    />
                )}
            </div>

            <div className="specialist-info">
                <h3>{product?.name || "No name"}</h3>
                <span>by {product?.createdBy?.name || 'Unknown Baker'}</span>

                <div className="rate_address rate_price">
                    <div className="rate">
                        <FaStar />
                        {product?.rating?.average ?? 0} ({product?.rating?.count ?? 0} reviews)
                    </div>
                    <div className="price">${product?.price ?? 0}</div>
                </div>

                {product?.sizes?.length > 0 && (
                    <p className="sizes">
                        Sizes:{" "}
                        {product.sizes.map((s, i) => (
                            <span key={i}>
                                {s.label} (${s.price})
                                {i < product.sizes.length - 1 && ", "}
                            </span>
                        ))}
                    </p>
                )}

                <div className="btns">
                    <button onClick={handleAddToCart} className="view">
                        <FaCartShopping /> Add to cart
                    </button>
                    <Link to="/constructor" className="customize">Customize</Link>
                </div>
            </div>
        </div>
    );
};


export default Card;
