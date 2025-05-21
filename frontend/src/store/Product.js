import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: '',
    success: '',

    setProducts: (products) => set({ products, error: '', success: '', loading: false }),

    createProduct: async (productData, token) => {
        set({ loading: true, error: '', success: '' });
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(productData),
            });

            const data = await res.json();

            if (!res.ok) {
                set({ loading: false, error: data.msg || 'Ошибка добавления продукта' });
                return { success: false, message: data.msg || 'Ошибка добавления продукта' };
            }

            set((state) => ({
                products: [...state.products, data],
                loading: false,
                success: 'Продукт успешно добавлен!',
            }));

            return { success: true, product: data };
        } catch (err) {
            set({ loading: false, error: err.message || 'Ошибка сети' });
            return { success: false, message: err.message || 'Ошибка сети' };
        }
    },

    fetchProducts: async () => {
        set({ loading: true, error: '' });
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to fetch products');

            set({ products: data, loading: false });
            return { success: true };
        } catch (err) {
            set({ loading: false, error: err.message });
            return { success: false, message: err.message };
        }
    },

    fetchProductsByBaker: async (bakerId) => {
        if (!bakerId) {
            set({ error: 'Missing baker ID' });
            return { success: false, message: 'Missing baker ID' };
        }
        set({ loading: true, error: '' });
        try {
            const res = await fetch(`/api/bakers/${bakerId}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Error fetching');

            set({ products: data, loading: false });
            return { success: true };
        } catch (err) {
            set({ loading: false, error: err.message });
            return { success: false, message: err.message };
        }
    },
}));
