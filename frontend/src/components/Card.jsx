import React from 'react'
import './Card.css'
import { FaCartShopping } from "react-icons/fa6";

const Card = ({ product }) => {
    return (
        <div className="cake-options">
            <img src={`http://localhost:5000${product.image}`} alt={product.name} className='cake' />
            <div className="gr-call">
                {/* <p>{weight}</p>
        <p>{kkal}</p> */}
            </div>
            <hr />
            <div className="name-price">
                <h3>{product.name}</h3>
                <span>{product.price} ₽</span>
                <p className="desc">{product.desc}</p>
            </div>
            <button className='cart'><FaCartShopping /> В корзину</button>
        </div>
    );
}

export default Card;
