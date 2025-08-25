import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/Cart";
import { useUserStore } from "../store/User";
import CartItem from "../components/CartItem";
import './Cart.scss';
import { RiShoppingBag3Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const { cart, fetchCart } = useCartStore();
    const { token } = useUserStore();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCart = async () => {
            if (token) await fetchCart(token);
            setLoading(false);
        };
        loadCart();
    }, [token, fetchCart]);

    if (loading) return <div className="container">Loading cart...</div>;

    if (!cart || cart.length === 0) {
        return (
            <div className="container">
                <div className="cart-page">
                    <h1 className="cart_h1">Your Cart</h1>
                    <div className="empty">
                        <RiShoppingBag3Line className="shop_icon" />
                        <h3>Your cart is empty</h3>
                        <p>Start building your perfect cake or browse our ready-made options</p>
                        <div className="btns">
                            <Link to={'/constructor'} className="build">Build Custom Cake</Link>
                            <Link to={'/cakes'} className="browse">Browse Ready Made</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Calculate total using selected size if present
    const total = cart.reduce((sum, item) => {
        const price = item.selectedSize?.price ?? item.product?.price ?? 0;
        return sum + price * item.quantity;
    }, 0);

    const handleCheckout = () => {
        navigate("/checkout", { state: { cart } });
    };

    return (
        <div className="container">
            <div className="cart-page">
                <h1 className="cart_h1">Your Cart</h1>
                {cart.map((item) => (
                    <CartItem key={item.product?._id} item={item} />
                ))}
                <div className="cart-total">
                    <h2>Total: {total} ₽</h2>
                    <button className="checkout-btn" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
