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
<<<<<<< HEAD
                    // Don't set Content-Type manually for FormData! Let the browser set it
                    Authorization: `Bearer ${token}`,
                },
                body: productData, // productData is now FormData
=======
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(productData),
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
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
<<<<<<< HEAD
            const response = await res.json();
            if (!res.ok) throw new Error(response.message || 'Failed to fetch products');

            set({ products: response.data, loading: false });
=======
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to fetch products');

            set({ products: data, loading: false });
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
            return { success: true };
        } catch (err) {
            set({ loading: false, error: err.message });
            return { success: false, message: err.message };
        }
    },

    fetchProductsByBaker: async (bakerId) => {
<<<<<<< HEAD
        set({ loading: true, error: '' });
        try {
            const res = await fetch(`/api/products/bakers/${bakerId}`);
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to fetch products');
            }
            const response = await res.json();
            set({ products: response.data, loading: false });  // Use response.data here
        } catch (err) {
            console.error('Error fetching products:', err);
            set({ loading: false, error: err.message });
=======
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
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
        }
    },
}));
