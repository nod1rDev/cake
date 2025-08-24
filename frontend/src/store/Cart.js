import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import debounce from "lodash.debounce";

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
          return res.data;
        } catch (err) {
          console.error("Error fetching cart:", err);
          return null;
        }
      },

      addToCart: async (productId, token, quantity = 1) => {
        // Optimistic update
        set((state) => {
          const itemIndex = state.cart.findIndex(
            (item) => item.product._id === productId
          );

          if (itemIndex > -1) {
            return {
              cart: state.cart.map((item) =>
                item.product._id === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            return {
              cart: [
                ...state.cart,
                { product: { _id: productId }, quantity },
              ],
            };
          }
        });

        // Server request in background
        try {
          const res = await axios.post(
            "http://localhost:5000/api/cart",
            { productId, quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          // Sync quantities only
          set((state) => ({
            cart: state.cart.map((item) => {
              const serverItem = res.data.find(
                (si) => si.product === item.product._id
              );
              return serverItem
                ? { ...item, quantity: serverItem.quantity }
                : item;
            }),
          }));
        } catch (err) {
          console.error("Error adding to cart:", err);
        }
      },

      updateQuantity: (productId, quantity, token) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        }));

        axios
          .put(
            `http://localhost:5000/api/cart/${productId}`,
            { quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .catch((err) => console.error("Error syncing quantity:", err));
      },


      debouncedSync: debounce(async (productId, quantity, token) => {
        try {
          const res = await axios.put(
            `http://localhost:5000/api/cart/${productId}`,
            { quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          set((state) => ({
            cart: state.cart.map((item) => {
              const serverItem = res.data.find(
                (si) => si.product === item.product._id
              );
              return serverItem
                ? { ...item, quantity: serverItem.quantity }
                : item;
            }),
          }));
        } catch (err) {
          console.error("Error syncing quantity:", err);
        }
      }, 200),

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
    }),
    { name: "cart-storage" }
  )
);
