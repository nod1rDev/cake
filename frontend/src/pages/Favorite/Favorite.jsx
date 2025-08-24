import React, { useEffect } from 'react';
import { useUserStore } from '../../store/User.js';
import toast from 'react-hot-toast';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard.jsx';
import FavoriteBakerCard from '../../components/FavoriteBakerCard/FavoriteBakerCard.jsx';

export default function Favorite() {
    const {
        favorites, fetchFavorites,
        bakerFavorites, fetchBakerFavorites,
        hydrated, token
    } = useUserStore();

    // Fetch both product and baker favorites
    useEffect(() => {
        if (hydrated && token) {
            fetchFavorites().catch(err =>
                toast.error(err.message || 'Failed to load product favorites')
            );
            fetchBakerFavorites().catch(err =>
                toast.error(err.message || 'Failed to load baker favorites')
            );
        }
    }, [fetchFavorites, fetchBakerFavorites, hydrated, token]);

    if (!token) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">⭐ My Favorites</h1>
                <p className="text-red-500">Please log in to view your favorites.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">⭐ My Favorites</h1>

            {/* Product Favorites */}
            {favorites?.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                        {favorites.map((product) => (
                            <FavoriteCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            )}
            {favorites?.length === 0 && (
                <p className="text-gray-500 mb-6">You haven’t added any product favorites yet.</p>
            )}

            {/* Baker Favorites */}
            {bakerFavorites?.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Bakers</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {bakerFavorites.map((baker) => (
                            <FavoriteBakerCard key={baker._id} baker={baker} />
                        ))}
                    </div>
                </div>
            )}
            {bakerFavorites?.length === 0 && (
                <p className="text-gray-500">You haven’t added any baker favorites yet.</p>
            )}
        </div>
    );
}
