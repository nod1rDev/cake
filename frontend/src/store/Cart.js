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

      addToCart: async (product, token, quantity = 1) => {
        const { cart } = get();

        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex(
          item => item && item.product && item.product._id === product._id
        );

        let newCart;

        if (existingItemIndex !== -1) {
          // Update quantity if product exists
          newCart = cart.map((item, index) =>
            index === existingItemIndex && item
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item if product doesn't exist
          newCart = [...cart, { product, quantity }];
        }

        // Optimistic update
        set({ cart: newCart });

        try {
          await axios.post(
            "http://localhost:5000/api/cart",
            { productId: product._id, quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (err) {
          console.error("❌ Add to cart error:", err);
          // Revert on error
          set({ cart });
        }
      },

      updateQuantity: (productId, selectedSize, quantity, token) => {
        const { cart } = get();

        const newCart = cart.map((item) => {
          if (!item || !item.product) return item;

          const sameProduct = item.product._id === productId;
          const sameSize =
            JSON.stringify(item.selectedSize || null) === JSON.stringify(selectedSize || null);

          if (sameProduct && sameSize) {
            return { ...item, quantity };
          }
          return item;
        });

        set({ cart: newCart });

        axios
          .put(
            `http://localhost:5000/api/cart/${productId}`,
            { quantity, selectedSize },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .catch((err) => {
            console.error("Error syncing quantity:", err);
            // Revert on error
            set({ cart });
          });
      },

      removeFromCart: (productId, token) => {
        const { cart } = get();
        const newCart = cart.filter(item => item && item.product && item.product._id !== productId);

        set({ cart: newCart });

        if (token) {
          axios.delete(`http://localhost:5000/api/cart/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).catch(err => {
            console.error("Error removing from cart:", err);
            // Revert on error
            set({ cart });
          });
        }
      },

      // Helper method to check if product is in cart
      isInCart: (productId) => {
        const { cart } = get();
        if (!productId) return false;
        return cart.some(item => item && item.product && item.product._id === productId);
      },

      // Helper method to get cart item quantity
      getCartItemQuantity: (productId) => {
        const { cart } = get();
        if (!productId) return 0;
        const item = cart.find(item => item && item.product && item.product._id === productId);
        return item ? item.quantity : 0;
      },

      debouncedSync: debounce(async (item, quantity, token) => {
        try {
          const res = await axios.put(
            `http://localhost:5000/api/cart/${item.product._id}`,
            { quantity, selectedSize: item.selectedSize },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          set({ cart: res.data });
        } catch (err) {
          console.error("Error syncing quantity:", err);
        }
      }, 200),

      // Clear cart (useful for after checkout)
      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" }
  )
);