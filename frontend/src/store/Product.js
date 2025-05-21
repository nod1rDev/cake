import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    error: '',
    success: '',
    loading: false,

    setProducts: (products) =>
        set({ products, error: '', success: '', loading: false }),

    createProduct: async (productData, token) => {
        set({ loading: true, error: '' });

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(productData),
            });

            const data = await response.json();

            if (!response.ok) {
                set({ loading: false });
                return {
                    success: false,
                    message: data.msg || 'Ошибка добавления продукта',
                };
            }

            set((state) => ({
                products: [...state.products, data],
                loading: false,
            }));

            return { success: true, product: data };
        } catch (error) {
            set({ loading: false });
            return { success: false, message: error.message || 'Ошибка сети' };
        }
    },

    fetchProducts: async () => {
        set({ loading: true });
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to fetch products');
            }
            set({ products: data, error: '', loading: false });
            return { success: true, data };
        } catch (error) {
            set({ error: error.message, loading: false });
            return { success: false, message: error.message };
        }
    },

    fetchProductsByBaker: async (bakerId) => {
        if (!bakerId) {
            set({ error: 'Missing baker ID', loading: false });
            return { success: false, message: 'Missing baker ID' };
        }

        set({ loading: true });
        try {
            const res = await fetch(`/api/bakers/${bakerId}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Error fetching');
            }

            set({ products: data, error: '', loading: false });
            return { success: true, data };
        } catch (error) {
            set({ error: error.message, loading: false });
            return { success: false, message: error.message };
        }
    },
}));
