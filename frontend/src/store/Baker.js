import { create } from 'zustand';

export const useBakerStore = create((set) => ({
    bakers: [],
    selectedBaker: null,
    error: '',
    loading: false,

    fetchBaker: async () => {
        try {
            set({ loading: true, error: '' });
            const response = await fetch('http://localhost:5000/api/bakers');
            if (!response.ok) throw new Error('Failed to fetch bakers');
            const data = await response.json();
            set({ bakers: data, error: '', loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    fetchBakerById: async (bakerId) => {
        try {
            set({ loading: true, error: '' });
            const response = await fetch(`http://localhost:5000/api/bakers/${bakerId}`);
            if (!response.ok) throw new Error(`Failed to fetch baker ${response.status}`);
            const data = await response.json();
            set({ selectedBaker: data, error: '', loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    clearSelectedBaker: () => set({ selectedBaker: null, error: '' }),
}));
