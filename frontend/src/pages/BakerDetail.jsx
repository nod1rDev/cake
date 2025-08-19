import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBakerStore } from '../store/Baker.js';
import { useProductStore } from '../store/Product.js';
import Card from '../components/Card.jsx';
import profile from '../assets/profile.jpg';
import './BakerDetail.css';

const BakerDetail = () => {
    const { bakerId } = useParams();

    const {
        selectedBaker,
        error,
        loading,
        fetchBakerById,
        clearSelectedBaker
    } = useBakerStore();

    const {
        products,
        fetchProductsByBaker
    } = useProductStore();

    // Fetch baker details
    useEffect(() => {
        if (bakerId) {
            fetchBakerById(bakerId);
            fetchProductsByBaker(bakerId);
        }
        return () => clearSelectedBaker();
    }, [bakerId, fetchBakerById, fetchProductsByBaker, clearSelectedBaker]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!selectedBaker) return <p>No baker found.</p>;

    const imageUrl = selectedBaker.image
        ? `http://localhost:5000/${selectedBaker.image.replace(/\\/g, '/')}`.replace('//', '/')
        : profile;

    return (
        <>
            <main className="bakerPage">
                <div className="left-side">
                    <img src={imageUrl} alt={selectedBaker.name || 'Baker'} />
                    <button className="signUp">ОСТАВИТЬ ОТЗЫВ</button>
                    <button className="comment"></button>
                </div>

                <div className="right-side">
                    <div className="right-side__top">
                        <div className="specialistInfo">
                            <h2>{selectedBaker.name}</h2>
                            <h3>Пекарь</h3>
                            <p>{selectedBaker.bio || 'Описание отсутствует.'}</p>
                            {selectedBaker.phone && (
                                <span>
                                    Свяжитесь:
                                    <Link className="phone" to={`tel:${selectedBaker.phone}`}>
                                        {selectedBaker.phone}
                                    </Link>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <div className="products">
                <h2>Товары пекаря</h2>
                {products.length === 0 ? (
                    <p>У этого пекаря пока нет товаров.</p>
                ) : (
                    <div className="product-list">
                        {products.map((product) => (
                            <Card key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default BakerDetail;
