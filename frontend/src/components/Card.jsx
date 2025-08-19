import React from 'react'
import './Card.css'
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/User.js';
import axios from 'axios';
import { FaRegHeart, FaStar } from 'react-icons/fa';

const Card = ({ product }) => {
    const navigate = useNavigate();
    const { user, token } = useUserStore();

    const handleCardClick = () => {
        navigate(`/product/${product._id}`);
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation();

        if (!user || !token) {
            alert('Please log in to add items to your cart.');
            return;
        }

        try {
            const res = await axios.post(
                'http://localhost:5000/api/cart',
                {
                    productId: product._id,
                    quantity: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('Added to cart:', res.data);
            alert('Product added to your cart!');
        } catch (err) {
            console.error('Error adding to cart:', err);
            alert('Could not add product to cart.');
        }
    };

    return (
        // <div className="cake-options" onClick={handleCardClick}>
        //     <img src={`http://localhost:5000${product.image}`} alt={product.name} className='cake' />
        //     <div className="gr-call">
        //         {/* weight, kkal if needed */}
        //     </div>
        //     <hr />
        //     <div className="name-price">
        //         <h3>{product.name}</h3>
        //         <span>{product.price} ₽</span>
        //         <p className="desc">{product.description}</p>
        //         {product.category && <p className="category">{product.category.name}</p>}
        //     </div>
        //     <button className='cart' onClick={handleAddToCart}>
        //         <FaCartShopping /> В корзину
        //     </button>
        // </div>
        <>
            <div className="specialist product_card">
                <button className='like product_like'><FaRegHeart /></button>
                <div className="specialist-photo">
                    <img
                        src={`http://localhost:5000${product.image}`}
                        alt=""
                    />
                </div>
                <div className="specialist-info">
                    <h3>{product.name}</h3>
                    <span>by {product?.createdBy?.name || 'undefined'}</span>
                    <div className="rate_address rate_price">
                        <div className="rate">
                            <FaStar /> {product.rate || 5}
                        </div>
                        <div className="price">
                            $ {product.price}
                        </div>
                    </div>
                    <div className="btns">
                        <Link to={'/order'} className='view'>Quick Order</Link>
                        <Link to={'/constructor'} className='customize' >Customize</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
