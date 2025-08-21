import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      setCart: (items) => set({ cart: items }),

      fetchCart: async (token) => {
        try {
          const res = await axios.get("http://localhost:5000/api/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ cart: res.data });
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      },

      addToCart: async (productId, token) => {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/cart",
            { productId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          set({ cart: res.data });
        } catch (err) {
          console.error("Error adding to cart:", err);
        }
      },
      
      updateQuantity: async (productId, quantity, token) => {
        // ✅ optimistic update
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          )
        }));

        try {
          await axios.put(
            `http://localhost:5000/api/cart/${productId}`,
            { quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (err) {
          console.error("Error updating quantity:", err);
          // ❌ rollback on error (optional)
        }
      },

      removeFromCart: async (productId, token) => {
        try {
          await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set((state) => ({
            cart: state.cart.filter((item) => item.product._id !== productId),
          }));
        } catch (err) {
          console.error("Error removing item:", err);
        }
      },
    }),
    { name: "cart-storage" }
  )
);
