import React from "react";
import { useCartStore } from "../store/Cart";
import { useUserStore } from "../store/User";
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
                src={`http://localhost:5000${item.product.image}`}
                alt={item.product.name}
                className="cart-item-img"
            />
            <div className="cart-item-info">
                <div className="texts">
                    <h3>{item.product.name}</h3>
                    <p>{item.product.bakery}</p>
                    {/* show only unit price */}
                    <span>{item.product.price} ₽ / each</span>
                </div>

                {/* Quantity Controls */}
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
