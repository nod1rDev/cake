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

<<<<<<< HEAD
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
=======
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
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
          }

          set({ user: data.userData, token: data.token, loading: false });
          return { success: true, token: data.token, userData: data.userData };
        } catch (err) {
          set({ errorMessage: err.message || 'Network error', loading: false });
<<<<<<< HEAD
          return { success: false, message: err.message };
        }
      },


=======
          return { success: false };
        }
      },

>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
      loginUser: async (credentials) => {
        set({ loading: true, errorMessage: '' });
        try {
          const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });
<<<<<<< HEAD
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
=======
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
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213

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
<<<<<<< HEAD
          let data;
          try {
            data = await res.json();
          } catch {
            data = {};
          }
          if (!res.ok) throw new Error(data.message || data.msg || 'Failed to fetch profile data');
=======
          if (!res.ok) throw new Error('Failed to fetch profile data');
          const data = await res.json();
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
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
<<<<<<< HEAD
);
=======
);
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
