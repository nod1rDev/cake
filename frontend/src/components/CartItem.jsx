import React from "react";
import { useCartStore } from "../store/Cart.js";
import { useUserStore } from "../store/User.js";
import "./CartItem.scss";

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCartStore();
    const { token } = useUserStore();

    const handleDecrease = () => {
        if (item.quantity > 1 && token) {
            updateQuantity(item.product._id, item.quantity - 1, token);
        }
    };

    const handleIncrease = () => {
        if (token) {
            updateQuantity(item.product._id, item.quantity + 1, token);
        }
    };

    return (
        <div className="cart-item">
            <img
                src={item.product.image ? `http://localhost:5000/uploads/${item.product.image}` : '/placeholder.png'}
                alt={item.product.name}
                className="cart-item-img"
            />
            <div className="cart-item-info">
                <div className="texts">
                    <h3>{item.product.name}</h3>
                    <p>{item.product.baker?.name || "Unknown bakery"}</p>
                    <span>{item.product.price} ₽ / each</span>
                </div>

                <div className="quantity-calculator">
                    <button onClick={handleDecrease}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>

                <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.product._id, token)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
