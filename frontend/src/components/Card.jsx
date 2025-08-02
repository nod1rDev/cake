import React from 'react'
import './Card.css'
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Card = ({ product }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/product/${product._id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent card click when clicking the cart button
        // TODO: Add to cart functionality
        console.log('Add to cart:', product._id);
    };

    return (
        <div className="cake-options" onClick={handleCardClick}>
            <img src={`http://localhost:5000${product.image}`} alt={product.name} className='cake' />
            <div className="gr-call">
                {/* <p>{weight}</p>
        <p>{kkal}</p> */}
            </div>
            <hr />
            <div className="name-price">
                <h3>{product.name}</h3>
                <span>{product.price} ₽</span>
                <p className="desc">{product.description}</p>
                {product.category && <p className="category">{product.category.name}</p>}
            </div>
            <button className='cart' onClick={handleAddToCart}><FaCartShopping /> В корзину</button>
        </div>
    );
}

export default Card;
