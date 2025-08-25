import axios from 'axios';
import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    categories: [],
    loading: false,
    error: '',
    success: '',

    setProducts: (products) => set({ products, error: '', success: '', loading: false }),

    createProduct: async (productData, token) => {
        set({ loading: true, error: '', success: '' });
        try {
            const res = await axios.post('http://localhost:5000/api/products', productData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Check the actual response structure from your backend
            console.log('Create product response:', res.data);

            // The product might be in res.data or res.data.product
            const newProduct = res.data.product || res.data;

            set((state) => ({
                products: [...state.products, newProduct],
                loading: false,
                success: '✅ Product successfully added!',
            }));

            return { success: true, product: newProduct };
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            set({ loading: false, error: message });
            return { success: false, message };
        }
    },

    fetchProductById: async (productId) => {
        try {
            const res = await axios.get(`/api/products/${productId}`);
            return res.data || null;
        } catch {
            return null;
        }
    },

    fetchProducts: async () => {
        set({ loading: true, error: '' });
        try {
            const res = await axios.get('/api/products');
            console.log('Fetch products response:', res.data);

            // Check the actual structure of the response
            let productsData = [];

            if (Array.isArray(res.data)) {
                productsData = res.data;
            } else if (res.data && Array.isArray(res.data.data)) {
                productsData = res.data.data;
            } else if (res.data && Array.isArray(res.data.products)) {
                productsData = res.data.products;
            }

            set({ products: productsData, loading: false });
        } catch (err) {
            console.error('Error fetching products:', err);
            set({ loading: false, error: err.message });
        }
    },

    fetchProductsByBaker: async (bakerId) => {
        set({ loading: true, error: '' });
        try {
            const res = await axios.get(`/api/products/bakers/${bakerId}`);
            set({ products: res.data || [], loading: false });
        } catch (err) {
            set({ loading: false, error: err.message });
        }
    },

    fetchCategories: async () => {
        set({ loading: true, error: '' });
        try {
            const res = await axios.get('/api/categories');

            // Ensure we always get an array
            let categoriesData = [];

            if (Array.isArray(res.data)) {
                categoriesData = res.data;
            } else if (res.data && Array.isArray(res.data.data)) {
                categoriesData = res.data.data;
            } else if (res.data && Array.isArray(res.data.categories)) {
                categoriesData = res.data.categories;
            }

            set({ categories: categoriesData, loading: false });
        } catch (err) {
            console.error("Error fetching categories:", err);
            set({ loading: false, error: err.message, categories: [] }); // Set empty array on error
        }
    },

    fetchProductsByCategory: async (categoryId) => {
        set({ loading: true, error: '' });
        try {
            const res = await axios.get(`/api/products/category/${categoryId}`);
            set({ products: res.data || [], loading: false });
        } catch (err) {
            set({ loading: false, error: err.message });
        }
    },

    deleteProduct: async (productId, token) => {
        set({ loading: true, error: '', success: '' });
        try {
            const res = await axios.delete(`/api/products/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set((state) => ({
                products: state.products.filter((p) => p._id !== productId),
                loading: false,
                success: '✅ Product successfully deleted!',
            }));

            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            set({ loading: false, error: message });
            return { success: false, message };
        }
    },

    clearMessages: () => set({ error: '', success: '' }),
}));
