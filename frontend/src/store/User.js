import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      userInfo: null,
      errorMessage: '',
      loading: false,
      hydrated: false,

      favorites: [],
      bakerFavorites: [],

      setHydrated: (value) => set({ hydrated: value }),

      createUser: async (formData) => {
        set({ loading: true, errorMessage: '' });

        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: formData,
          });

          let data;
          try {
            data = await res.json();
          } catch {
            data = {};
          }

          if (!res.ok || !data.userData || !data.token) {
            set({ errorMessage: data.message || data.msg || 'Registration failed', loading: false });
            return { success: false, message: data.message || data.msg };
          }

          set({ user: data.userData, token: data.token, loading: false });

          // ⭐ Fetch favorites right after register
          await get().fetchFavorites();

          return { success: true, token: data.token, userData: data.userData };
        } catch (err) {
          set({ errorMessage: err.message || 'Network error', loading: false });
          return { success: false, message: err.message };
        }
      },

      loginUser: async (credentials) => {
        set({ loading: true, errorMessage: '' });
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });
          let data;
          try {
            data = await res.json();
          } catch {
            data = {};
          }

          if (!res.ok || !data.userData || !data.token) {
            set({ errorMessage: data.message || 'Login failed', loading: false });
            return { success: false, message: data.message };
          }

          set({ user: data.userData, token: data.token, loading: false });

          // ⭐ Fetch favorites right after login
          await get().fetchFavorites();

          return { success: true, token: data.token, userData: data.userData };
        } catch (err) {
          set({ errorMessage: err.message || 'Network error', loading: false });
          return { success: false, message: err.message };
        }
      },

      logoutUser: () => {
        localStorage.clear();
        set({ user: null, token: null, favorites: [] }); // clear favorites too
      },

      fetchProfile: async () => {
        const token = get().token;
        if (!token) {
          set({ errorMessage: 'No token found. Please login.' });
          return;
        }
        set({ loading: true, errorMessage: '' });

        try {
          const res = await fetch('/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          let data;
          try {
            data = await res.json();
          } catch {
            data = {};
          }
          if (!res.ok) throw new Error(data.message || data.msg || 'Failed to fetch profile data');
          set({ userInfo: data, loading: false });
        } catch (err) {
          set({ errorMessage: err.message, loading: false });
        }
      },

      setUserData: ({ user, token }) => set({ user, token }),

      fetchFavorites: async () => {
        try {
          const { token } = get();
          if (!token) return;

          const res = await axios.get("http://localhost:5000/api/favorites", {
            headers: { Authorization: `Bearer ${token}` },
          });

          set({ favorites: res.data });
        } catch (err) {
          console.error("❌ Failed to fetch favorites:", err);
        }
      },

      addFavorite: async (product) => {
        if (!product || !product._id) {
          console.error("❌ Invalid product passed to addFavorite:", product);
          return;
        }

        const { favorites, token } = get();
        try {
          const res = await fetch('/api/favorites', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId: product._id }),
          });

          if (!res.ok) throw new Error('Failed to add favorite');

          // Optimistic update
          if (!favorites.find((p) => p._id === product._id)) {
            set({ favorites: [...favorites, product] });
          }
        } catch (err) {
          console.error('Add favorite error:', err.message);
        }
      },

      removeFavorite: async (productId) => {
        const { favorites, token } = get();
        try {
          const res = await fetch(`/api/favorites/${productId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) throw new Error('Failed to remove favorite');

          set({ favorites: favorites.filter((p) => p._id !== productId) });
        } catch (err) {
          console.error('Remove favorite error:', err.message);
        }
      },

      fetchCart: async () => {
        try {
          const { token } = get();
          if (!token) return;

          const res = await axios.get("http://localhost:5000/api/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });

          // ✅ Ensure we always return an array
          set({ cart: res.data.items || [] });
        } catch (err) {
          console.error("❌ Error fetching cart:", err);
          set({ cart: [] }); // fallback so map() never breaks
        }
      },

      clearFavorites: () => set({ favorites: [] }),

      fetchBakerFavorites: async () => {
        const { token } = get(); // get token from store
        if (!token) return;
        try {
          const res = await fetch("http://localhost:5000/api/favorites/bakers", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          set({ bakerFavorites: data });
        } catch (err) {
          console.error("Error fetching baker favorites:", err);
        }
      },

      addBakerFavorite: async (baker) => {
        const { token } = get(); // get token from store
        if (!token) return;
        try {
          await fetch(`http://localhost:5000/api/favorites/bakers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ bakerId: baker._id }),
          });
          set((state) => ({ bakerFavorites: [...state.bakerFavorites, baker] }));
        } catch (err) {
          console.error("Error adding baker favorite:", err);
        }
      },

      removeBakerFavorite: async (bakerId) => {
        const { token } = get(); // get token from store
        if (!token) return;
        try {
          await fetch(`http://localhost:5000/api/favorites/bakers/${bakerId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          set((state) => ({
            bakerFavorites: state.bakerFavorites.filter(b => b._id !== bakerId)
          }));
        } catch (err) {
          console.error("Error removing baker favorite:", err);
        }
      },

    }),

    {
      name: 'user-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        favorites: state.favorites, // ✅ fixed: store full objects instead of just IDs
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHydrated(true);
      },
    }
  )
);
