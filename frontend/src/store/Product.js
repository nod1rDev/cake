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
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: productData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Ошибка добавления продукта');

            set((state) => ({
                products: [...state.products, data],
                loading: false,
                success: 'Продукт успешно добавлен!',
            }));

            return { success: true, product: data };
        } catch (err) {
            set({ loading: false, error: err.message });
            return { success: false, message: err.message };
        }
    },

    fetchProductById: async (productId) => {
        try {
            const res = await fetch(`/api/products/${productId}`);
            const data = await res.json();
            return res.ok ? data.data : null;
        } catch {
            return null;
        }
    },

    fetchProducts: async () => {
        set({ loading: true, error: '' });
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            set({ products: res.ok ? data.data : [], loading: false });
        } catch (err) {
            set({ loading: false, error: err.message });
        }
    },

    fetchProductsByBaker: async (bakerId) => {
        set({ loading: true, error: '' });
        try {
            const res = await fetch(`/api/products/bakers/${bakerId}`);
            const data = await res.json();
            set({ products: res.ok ? data.data : [], loading: false });
        } catch (err) {
            set({ loading: false, error: err.message });
        }
    },

    fetchCategories: async () => {
        set({ loading: true, error: '' });
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            set({ categories: res.ok ? data.data : [], loading: false });
        } catch (err) {
            set({ loading: false, error: err.message });
        }
    },

    fetchProductsByCategory: async (categoryId) => {
        set({ loading: true, error: '' });
        try {
            const res = await fetch(`/api/products/category/${categoryId}`);
            const data = await res.json();
            set({ products: res.ok ? data.data : [], loading: false });
        } catch (err) {
            set({ loading: false, error: err.message });
        }
    },

    deleteProduct: async (productId, token) => {
        set({ loading: true, error: '', success: '' });
        try {
            const res = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Ошибка удаления продукта');

            set((state) => ({
                products: state.products.filter((p) => p._id !== productId),
                loading: false,
                success: 'Продукт успешно удален!',
            }));
            return { success: true };
        } catch (err) {
            set({ loading: false, error: err.message });
            return { success: false, message: err.message };
        }
    },

    clearMessages: () => set({ error: '', success: '' }),
}));
