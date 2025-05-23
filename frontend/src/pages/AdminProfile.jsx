import { useEffect } from 'react';
import { useUserStore } from '../store/User';
import { Link, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/Product';
import './AdminProfile.css';
import ProductCard from '../components/ProductCard';

const AdminProfile = () => {
    const { userInfo, fetchProfile, logoutUser } = useUserStore();

    useEffect(() => {
        console.log('calling fetchProfile');
        fetchProfile();
    }, [fetchProfile]);

    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/register');
    };

    const { products, fetchProductsByBaker } = useProductStore();

    useEffect(() => {
        if (userInfo?._id) {
            fetchProductsByBaker(userInfo._id);
        }
    }, [userInfo, fetchProductsByBaker]);

    return (
        <>
            <main className="profile">
                <div className="left-side">
                    <h1>{userInfo?.name}</h1>
                    <nav className="VikaLinks">
                        <button className='logout' onClick={handleLogout}>ВЫЙТИ</button>
                    </nav>
                </div>

                <div className="right-side">
                    <div className="PersonalInfo">
                        <h2>Личные данные</h2>
                        <div className="PersonalInfo-container">
                            <div className="PersonalInfo-container-left">
                                <div className="image-container">
                                    <img src={userInfo?.image} alt="" />
                                    <Link>изменить</Link>
                                </div>
                                <div className="PersonalInfo-container-left-text">
                                    <div className="info-pair">
                                        <h3>Имя</h3>
                                        <p>{userInfo?.name}</p>
                                    </div>
                                    <div className="info-pair">
                                        <h3>Почта</h3>
                                        <p>{userInfo?.email}</p>
                                    </div>
                                    <div className="info-pair">
                                        <h3>Телефон</h3>
                                        <p>{userInfo?.phone}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="PersonalInfo-container-right">
                                <h3>О себе</h3>
                                <p>{userInfo?.bio}</p>
                            </div>
                        </div>

                        <div className="pets">
                            <h2>Мои продукты</h2>
                            <Link to={'/admin'}><button className="add-pet">Добавить продукт</button></Link>
                            <div className="pets-container">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        // <div key={product?._id}>
                                        //     <h4>{product?.name}</h4>
                                        //     <p>{product.description}</p>
                                        //     <p>${product.price}</p>
                                        // </div>
                                        <ProductCard key={product?._id} product={product} />
                                    ))
                                ) : (
                                    <p>No products found for this baker.</p>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </>
    );
};

export default AdminProfile;
