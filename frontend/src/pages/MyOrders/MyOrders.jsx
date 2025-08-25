import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/User";
import axios from "axios";

const MyOrders = () => {
    const { token } = useUserStore();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await axios.get("/api/orders/my-orders", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(res.data);
        };
        fetchOrders();
    }, [token]);

    return (
        <div className="orders-container">
            <h1>My Orders</h1>
            {orders.map((order) => (
                <div key={order._id} className="order-card">
                    <h3>Order #{order._id}</h3>
                    <p>Status: {order.status}</p>
                    <ul>
                        {order.items.map((item) => (
                            <li key={item.product._id}>
                                {item.product.name} × {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p>Total: {order.totalPrice} ₽</p>
                </div>
            ))}
        </div>
    );
};

export default MyOrders;
