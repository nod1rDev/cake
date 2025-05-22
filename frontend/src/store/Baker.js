// Inside your store (useBakerStore.js)
import { create } from 'zustand';

export const useBakerStore = create((set) => ({
    bakers: [],
    error: '',

    fetchBaker: async () => {
        try {
            const response = await fetch('/api/bakers');
            if (!response.ok) {
                throw new Error('Failed to fetch bakers');
            }
            const data = await response.json();
            set({ bakers: data, error: '' });
        } catch (err) {
            set({ error: err.message });
        }
    }
}));
