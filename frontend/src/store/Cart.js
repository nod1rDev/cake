// store/Cart.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      setCart: (items) => set({ cart: items }),

      fetchCart: async (token) => {
        try {
          const res = await axios.get("http://localhost:5000/api/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ cart: res.data });
          return res.data;
        } catch (err) {
          console.error("Error fetching cart:", err);
          return null;
        }
      },

      addToCart: async (productId, token, quantity = 1) => {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/cart",
            { productId, quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          set({ cart: res.data });
          return res.data;
        } catch (err) {
          console.error("Error adding to cart:", err);
          return null;
        }
      },

      removeFromCart: async (productId, token) => {
        try {
          const res = await axios.delete(
            `http://localhost:5000/api/cart/${productId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          set({ cart: res.data });
          return res.data;
        } catch (err) {
          console.error("Error removing item:", err);
          return null;
        }
      },

      updateQuantity: async (productId, quantity, token) => {
        try {
          const res = await axios.put(
            `http://localhost:5000/api/cart/${productId}`,
            { quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          set({ cart: res.data });
          return res.data;
        } catch (err) {
          console.error("Error updating quantity:", err);
          return null;
        }
      },
    }),
    { name: "cart-storage" }
  )
);
