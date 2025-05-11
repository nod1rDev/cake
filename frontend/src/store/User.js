import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      userInfo: null,
      errorMessage: '',

      createUser: async (userData) => {
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          });
          const data = await response.json();
          if (response.ok) {
            set({ user: data.userData, token: data.token });
            localStorage.setItem('user', JSON.stringify(data.userData));
            localStorage.setItem('token', data.token);
            return { success: true, token: data.token, userData: data.userData };
          } else {
            return { success: false, message: data.message || 'Registration failed' };
          }
        } catch (error) {
          return { success: false, message: error.message || 'Network error' };
        }
      },

      loginUser: async (credentials) => {
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });
          const data = await response.json();
          if (response.ok && data.userData) {
            set({ user: data.userData, token: data.token });
            localStorage.setItem('user', JSON.stringify(data.userData));
            localStorage.setItem('token', data.token);
            return { success: true };
          } else {
            return { success: false, message: data.message || 'Login failed' };
          }
        } catch (error) {
          return { success: false, message: error.message };
        }
      },

      logoutUser: () => {
        set({ user: null, token: null, userInfo: null, errorMessage: '', isLoadingProfile: false });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      },

      fetchProfile: async () => {
        const token = get().token; // ✅ use get() from Zustand, not localStorage
        if (!token) {
          set({ errorMessage: 'No token found. Please login.' });
          return;
        }

        try {
          const response = await fetch('/api/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch profile data');
          }

          const data = await response.json();
          set({ userInfo: data, errorMessage: '' });
        } catch (error) {
          set({ errorMessage: error.message });
        }
      },


      // This is to allow setting the user and token from localStorage on initial render
      setUserData: ({ user, token }) => set({ user, token }),
    }),
    {
      name: 'user-store', // localStorage key
      partialize: (state) => ({ user: state.user, token: state.token }), // persist only user and token
    }
  )
);
