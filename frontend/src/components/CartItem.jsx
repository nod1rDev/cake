import React from "react";
import { useCartStore } from "../store/Cart.js";
import { useUserStore } from "../store/User.js";
import "./CartItem.scss";

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCartStore();
    const { token } = useUserStore();

    if (!item || !item.product) return null;

    const handleDecrease = () => {
        if (item.quantity > 1 && token) {
            updateQuantity(item.product._id, item.selectedSize, item.quantity - 1, token);
        }
    };

    const handleIncrease = () => {
        if (token) {
            updateQuantity(item.product._id, item.selectedSize, item.quantity + 1, token);
        }
    };

    const handleRemove = () => {
        removeFromCart(item.product._id, item.selectedSize, token);
    };


    const price = item.selectedSize?.price ?? item.product.price;

    return (
        <div className="cart-item">
            <img
                src={item.product.image ? `http://localhost:5000${item.product.image}` : '/placeholder.png'}
                alt={item.product.name}
                className="cart-item-img"
            />
            <div className="cart-item-info">
                <div className="texts">
                    <h3>{item.product.name}</h3>
                    <p>{item.product.baker?.name || "Unknown bakery"}</p>
                    <span>{price} ₽ / each</span>
                </div>

                <div className="quantity-calculator">
                    <button onClick={handleDecrease}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>

                <button
                    className="remove-btn"
                    onClick={handleRemove}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
