import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCartStore } from "../store/Cart.js";
import { useUserStore } from "../store/User.js";
import "./Cart.css";

const Cart = () => {
    const { cart, setCart } = useCartStore();
    const { token } = useUserStore();
    const [loading, setLoading] = useState(true);

    // Fetch cart from backend when page loads
    useEffect(() => {
        if (!token) return;
        const fetchCart = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCart(res.data); // store in Zustand
            } catch (err) {
                console.error("Error fetching cart:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, [token, setCart]);

    // Remove product from cart
    const handleRemove = async (productId) => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/cart/${productId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setCart(res.data);
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };

    // Update quantity
    const handleQuantityChange = async (productId, quantity) => {
        if (quantity < 1) return;
        try {
            const res = await axios.put(
                `http://localhost:5000/api/cart/${productId}`,
                { quantity },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setCart(res.data);
        } catch (err) {
            console.error("Error updating quantity:", err);
        }
    };

    if (loading) return <p>Loading cart...</p>;
    if (!cart || cart.length === 0) return <p>Your cart is empty.</p>;

    const totalPrice = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cart.map((item) => (
                <div className="cart-item" key={item.product._id}>
                    <img
                        src={`http://localhost:5000${item.product.image}`}
                        alt={item.product.name}
                        className="cart-item-img"
                    />
                    <div className="cart-item-info">
                        <h3>{item.product.name}</h3>
                        <p>{item.product.price} ₽</p>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                                handleQuantityChange(item.product._id, parseInt(e.target.value))
                            }
                            min="1"
                        />
                        <button onClick={() => handleRemove(item.product._id)}>
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <hr />
            <h3>Total: {totalPrice} ₽</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
        </div>
    );
};

export default Cart;

