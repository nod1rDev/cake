import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBakerStore } from '../store/Baker.js';
import './BakerDetail.css'
import profile from '../assets/profile.jpg'
import { useProductStore } from '../store/Product.js';
import Card from '../components/Card.jsx';

const BakerDetail = () => {
    const { bakerId } = useParams();
    const { selectedBaker, error, loading, fetchBakerById, clearSelectedBaker } = useBakerStore();

    useEffect(() => {
        if (bakerId) {
            fetchBakerById(bakerId);
        }

        return () => clearSelectedBaker();
    }, [bakerId, clearSelectedBaker, fetchBakerById]);

    const { products, fetchProductsByBaker } = useProductStore();

    useEffect(() => {
        if (bakerId) fetchProductsByBaker(bakerId);
    }, [bakerId, fetchProductsByBaker]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!selectedBaker) return <p>No baker found</p>;

    console.log('Baker image:', selectedBaker.image);

    const normalizedImagePath = selectedBaker.image ? selectedBaker.image.replace(/\\/g, '/') : '';
    const imageUrl = normalizedImagePath
        ? `http://localhost:3000${normalizedImagePath.startsWith('/') ? normalizedImagePath : '/' + normalizedImagePath}`
        : profile;

    return (
        <>
            <main className="bakerPage">
                <div className="left-side">
                    <img
                        src={imageUrl}
                        alt={selectedBaker.name}
                    />
                    {/* <h3>ближайшая дата приема: 29.08.19</h3> */}
                    <button className="signUp">ОСТАВИТЬ ОТЗЫВ</button>
                    <button className="comment"></button>
                </div>



                <div className="right-side">
                    <div className="right-side__top">
                        {/* <button className="back">
                            <img src="images/arrow-down-sign-to-navigate.png" alt="" />НАЗАД
                        </button> */}

                        <div className="specialistInfo">
                            <h2>{selectedBaker.name}</h2>
                            <h3>пекарь</h3>
                            <p>{selectedBaker.bio}</p>
                            <span>Свяжитесь: <Link className="phone" to={''}>{selectedBaker.phone}</Link></span>
                        </div>
                    </div>


                    {/* <section classNameName="comments">
                        <h2>Отзывы</h2>
                        <div className="first-comment commentaries">
                            <img src="images/Ellipse (3).png" alt="" />
                            <div className="comment-text">
                                <div className="comment-user">
                                    <h3>пользоваель</h3>
                                    <p>Виктория</p>

                                </div>

                                <div className="comment-content">

                                    <h3>отзыв</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                        ut
                                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                                        in
                                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum,
                                        Lorem
                                        ip
                                    </p>
                                </div>

                                <div className="comment-answer">
                                    <img src="images/Ellipse (4).png" alt="" />
                                    <div className="answer-text">
                                        <h3>ответ</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua!</p>

                                    </div>
                                </div>

                            </div>
                        </div>





                        <div className="second-comment commentaries">
                            <img src="images/Ellipse (5).png" alt="" />
                            <div className="comment-text">
                                <div className="comment-user">
                                    <h3>пользоваель</h3>
                                    <p>Дмитрий</p>

                                </div>

                                <div className="comment-content">

                                    <h3>отзыв</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                        ut
                                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                                        in
                                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum,
                                        Lorem
                                        ip
                                    </p>
                                </div>

                                <div className="comment-answer">
                                    <img src="images/Ellipse (4).png" alt="" />
                                    <div className="answer-text">
                                        <h3>ответ</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua!</p>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </section> */}
                </div>
            </main>

            <div className="products">
                <h2>Товары пекаря</h2>
                {products.length === 0 ? (
                    <p>У этого пекаря пока нет товаров.</p>
                ) : (
                    <div className="product-list">
                        {products.map((product) => (
                            <div key={product._id} className="product-card">
                                {/* <img src={product.image || profile} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p><strong>{product.price} сум</strong></p> */}
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default BakerDetail
