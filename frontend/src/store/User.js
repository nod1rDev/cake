import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  token: null,
  userInfo: null,  // Add userInfo state to store fetched profile data
  errorMessage: '', // Initialize errorMessage

  createUser: async (userData) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        set({ user: userData, token: data.token });
        return { success: true, token: data.token, userData: userData };
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
      if (response.ok) {
        set({ user: { email: credentials.email }, token: data.token });
        return { success: true, token: data.token, userData: { email: credentials.email } };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: error.message || 'Network error' };
    }
  },

  logoutUser: () => set({ user: null, token: null }),

  fetchProfile: async () => {
    const token = localStorage.getItem('token');
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
}));
