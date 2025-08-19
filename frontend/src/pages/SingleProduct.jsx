import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/Product';
import './SingleProduct.css';
import profileImage from '../assets/profile.jpg';

const SingleProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/products/${productId}`);
                const data = await res.json();
                
                if (res.ok) {
                    setProduct(data.data);
                } else {
                    setError(data.message || 'Продукт не найден');
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Ошибка загрузки продукта');
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    if (loading) {
        return (
            <div className="single-product-loading">
                <p>Загрузка продукта...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="single-product-error">
                <p>{error}</p>
                <button onClick={() => navigate('/catalog')}>Вернуться к каталогу</button>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="single-product-error">
                <p>Продукт не найден</p>
                <button onClick={() => navigate('/catalog')}>Вернуться к каталогу</button>
            </div>
        );
    }

    return (
        <main className="single-product-main">
            <div className="single-product-container">
                <div className="product-image-section">
                    <img 
                        src={`http://localhost:5000${product.image}`} 
                        alt={product.name}
                        className="product-image"
                    />
                </div>
                
                <div className="product-info-section">
                    <div className="product-header">
                        <h1>{product.name}</h1>
                        <div className="product-price">
                            <span className="price-amount">{product.price}</span>
                            <span className="price-currency">₽</span>
                        </div>
                    </div>

                    <div className="product-category">
                        {product.category && (
                            <span className="category-tag">
                                {product.category.name}
                            </span>
                        )}
                    </div>

                    <div className="product-description">
                        <h3>Описание</h3>
                        <p>{product.description}</p>
                    </div>

                    <div className="product-actions">
                        <button className="add-to-cart-btn">
                            <span>🛒</span>
                            Добавить в корзину
                        </button>
                        <button 
                            className="back-to-catalog-btn"
                            onClick={() => navigate('/catalog')}
                        >
                            ← Вернуться к каталогу
                        </button>
                    </div>

                    {product.createdBy && (
                        <div className="product-baker">
                            <h3>Пекарь</h3>
                            <div className="baker-info">
                                <img 
                                    src={product.createdBy.image ? `http://localhost:5000${product.createdBy.image}` : profileImage} 
                                    alt={product.createdBy.name || 'Baker'}
                                    className="baker-avatar"
                                />
                                <div className="baker-details">
                                    <h4>{product.createdBy.name}</h4>
                                    {product.createdBy.bio && (
                                        <p>{product.createdBy.bio}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default SingleProduct; 