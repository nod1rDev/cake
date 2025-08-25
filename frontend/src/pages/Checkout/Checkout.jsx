import React, { useState } from "react";
import { useUserStore } from "../../store/User";
import { useOrderStore } from "../../store/Order";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const Checkout = () => {
    const { token } = useUserStore();
    const placeOrder = useOrderStore((state) => state.placeOrder);
    const navigate = useNavigate();
    const location = useLocation();
    const cart = location.state?.cart || [];

    const [deliveryInfo, setDeliveryInfo] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
    });

    const handleChange = (e) => {
        setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
    };

    const total = cart.reduce((sum, item) => {
        const price = item.selectedSize?.price ?? item.product?.price ?? 0;
        return sum + price * item.quantity;
    }, 0);

    const handleOrder = async () => {
        if (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address || !deliveryInfo.city) {
            toast.error("Please fill all fields");
            return;
        }

        const orderData = {
            items: cart.map(item => ({
                product: item.product?._id,   // your schema needs product ID
                quantity: item.quantity
            })),
            totalPrice: total,   // match schema
            deliveryInfo
        };

        console.log("Sending order:", orderData); // 🟢 Debug log

        try {
            await placeOrder(token, orderData);
            toast.success("Order placed!");
            navigate("/my-orders");
        } catch (err) {
            console.error("❌ Order failed:", err);
            toast.error(err.response?.data?.message || err.message || "Order failed");
        }
    };


    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <div className="checkout-cart">
                <h2>Order Summary</h2>
                {cart.map((item, idx) => {
                    const productName = item.product?.name || "Unknown Product";
                    const price = item.selectedSize?.price ?? item.product?.price ?? 0;

                    return (
                        <div key={idx} className="checkout-item">
                            <span>{productName}</span>
                            <span>Size: {item.selectedSize?.label || "Default"}</span>
                            <span>Qty: {item.quantity}</span>
                            <span>Price: ${price * item.quantity}</span>
                        </div>
                    );
                })}
                <h3>Total: ${total}</h3>
            </div>
            <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
                <input name="name" placeholder="Full Name" value={deliveryInfo.name} onChange={handleChange} />
                <input name="phone" placeholder="Phone" value={deliveryInfo.phone} onChange={handleChange} />
                <input name="address" placeholder="Address" value={deliveryInfo.address} onChange={handleChange} />
                <input name="city" placeholder="City" value={deliveryInfo.city} onChange={handleChange} />
            </form>
            <button className="checkout-btn" onClick={handleOrder}>Place Order</button>
        </div>
    );
};

export default Checkout;
