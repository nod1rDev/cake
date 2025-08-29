import React, { useEffect, useState } from "react";
import "./AdminPanel.scss";

export default function CustomCakeAdminPanel() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/my?bakerId=${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      console.log();

      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchOrders();
        setStatus("✅ Status yangilandi");
      } else {
        setStatus("❌ Xatolik yuz berdi");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Server xatosi");
    }
  };

  const statusOptions = [
    { value: "pending", label: "🕒 Pending" },
    { value: "accepted", label: "✅ Accepted" },
    { value: "rejected", label: "❌ Rejected" },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-panel">
      <h1>📋 Custom Cake Orders</h1>
      {status && <p className="message">{status}</p>}
      <table>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer</th>
            <th>Cake</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders ? (
            orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>
                  {order.deliveryInfo.name} ({order.deliveryInfo.phone})
                </td>
                <td>
                  {order.sponge}, {order.cream}, {order.decoration}
                </td>
                <td className={`status ${order.status}`}>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className={`status-select ${order.status}`}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
