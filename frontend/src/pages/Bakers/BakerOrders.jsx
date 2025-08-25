import React, { useEffect } from "react";
import { useOrderStore } from "../../store/Order";
import { useUserStore } from "../../store/User";

const BakerOrders = () => {
    const { token } = useUserStore();
    const { orders, fetchBakerOrders } = useOrderStore();

    useEffect(() => {
        if (token) fetchBakerOrders(token);
    }, [token, fetchBakerOrders]);

    return (
        <div>
            <h1>Orders for My Products</h1>
            {orders.length === 0 ? (
                <p>No orders yet</p>
            ) : (
                orders.map(order => (
                    <div key={order._id}>
                        <p>Order #{order.orderNumber}</p>
                        <p>Total: {order.totalPrice} ₽</p>
                        <p>Customer: {order.user.name}</p>
                        <p>Items:</p>
                        <ul>
                            {order.items.map(i => (
                                <li key={i.product._id}>{i.product.name} x{i.quantity}</li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default BakerOrders;
