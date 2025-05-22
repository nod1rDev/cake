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

      createUser: async (formData) => {
        set({ loading: true, errorMessage: '' });

        try {
          const res = await fetch('/api/register', {
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
          return { success: true, token: data.token, userData: data.userData };
        } catch (err) {
          set({ errorMessage: err.message || 'Network error', loading: false });
          return { success: false, message: err.message };
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
          return { success: true, token: data.token, userData: data.userData };
        } catch (err) {
          set({ errorMessage: err.message || 'Network error', loading: false });
          return { success: false, message: err.message };
        }
      },

      logoutUser: () => {
        localStorage.clear();
        set({ user: null, token: null });
      },

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