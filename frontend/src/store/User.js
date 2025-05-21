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

      setHydrated: (value) => set({ hydrated: value }),

      createUser: async (userData) => {
        set({ loading: true, errorMessage: '' });
        try {
          const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          });
          const data = await res.json();

          if (!res.ok) {
            set({ errorMessage: data.message || 'Registration failed', loading: false });
            return { success: false };
          }

          set({ user: data.userData, token: data.token, loading: false });
          return { success: true, token: data.token, userData: data.userData };
        } catch (err) {
          set({ errorMessage: err.message || 'Network error', loading: false });
          return { success: false };
        }
      },

      loginUser: async (credentials) => {
        set({ loading: true, errorMessage: '' });
        try {
          const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });
          const data = await res.json();

          if (!res.ok || !data.userData) {
            set({ errorMessage: data.message || 'Login failed', loading: false });
            return { success: false };
          }

          set({ user: data.userData, token: data.token, loading: false });
          return { success: true };
        } catch (err) {
          set({ errorMessage: err.message || 'Network error', loading: false });
          return { success: false };
        }
      },

      logoutUser: () => set({ user: null, token: null, userInfo: null, errorMessage: '' }),

      fetchProfile: async () => {
        const token = get().token;
        if (!token) {
          set({ errorMessage: 'No token found. Please login.' });
          return;
        }
        set({ loading: true, errorMessage: '' });

        try {
          const res = await fetch('/api/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error('Failed to fetch profile data');
          const data = await res.json();
          set({ userInfo: data, loading: false });
        } catch (err) {
          set({ errorMessage: err.message, loading: false });
        }
      },

      setUserData: ({ user, token }) => set({ user, token }),
    }),
    {
      name: 'user-store',
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHydrated(true);
      },
    }
  )
);
