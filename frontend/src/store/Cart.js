import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  setCart: (items) => set({ cart: items }),
  addToCart: (item) =>
    set((state) => ({ cart: [...state.cart, item] }))
}));
