import { create } from "zustand";
import axios from "axios";
import { useCartStore } from "./Cart";

export const useOrderStore = create((set, get) => ({
    orders: [],

    placeOrder: async (token, deliveryInfo) => {
        const { cart, setCart } = useCartStore.getState();

        if (!cart || cart.length === 0) throw new Error("Cart is empty");

        try {
            const payload = {
                items: cart.map(i => ({ product: i.product._id, quantity: i.quantity })),
                deliveryInfo,
            };

            const res = await axios.post("/api/orders", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCart([]); // clear cart
            set(state => ({ orders: [...state.orders, res.data] }));
            return res.data;
        } catch (error) {
            console.error(error.response?.data || error.message);
            throw error;
        }
    },

    fetchOrders: async (token) => {
        try {
            const res = await axios.get("/api/orders/my-orders", {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ orders: res.data });
        } catch (error) {
            console.error(error);
        }
    },

    fetchBakerOrders: async (token) => {
        try {
            const res = await axios.get("/api/orders/baker-orders", {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ orders: res.data });
        } catch (error) {
            console.error(error);
        }
    },
}));
