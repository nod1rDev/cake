import { useEffect, useState } from 'react';
import { useUserStore } from '../store/User';
import { Link, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/Product';
import { useCategoryStore } from '../store/Category';
import './AdminProfile.css';
import ProductCard from '../components/ProductCard';
import profileImage from '../assets/profile.jpg';

const AdminProfile = () => {
    const { userInfo, fetchProfile, logoutUser, token } = useUserStore();
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        console.log('calling fetchProfile');
        fetchProfile();
    }, [fetchProfile]);

    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/register');
    };

    const { products, fetchProductsByBaker, success: productSuccess, error: productError, clearMessages: clearProductMessages } = useProductStore();
    const { 
        categories, 
        fetchCategories, 
        createCategory, 
        updateCategory, 
        deleteCategory, 
        loading: categoryLoading, 
        error: categoryError, 
        success: categorySuccess,
        clearMessages 
    } = useCategoryStore();

    useEffect(() => {
        if (userInfo?._id) {
            fetchProductsByBaker(userInfo._id);
        }
    }, [userInfo, fetchProductsByBaker]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleCreateCategory = async () => {
        if (!newCategory.name.trim()) {
            return;
        }

        const result = await createCategory(newCategory, token);
        if (result.success) {
            setNewCategory({ name: '', description: '' });
            setTimeout(() => clearMessages(), 3000);
        }
    };

    const handleUpdateCategory = async (categoryId) => {
        if (!editingCategory.name.trim()) {
            return;
        }

        const result = await updateCategory(categoryId, editingCategory, token);
        if (result.success) {
            setEditingCategory(null);
            setTimeout(() => clearMessages(), 3000);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
            const result = await deleteCategory(categoryId, token);
            if (result.success) {
                setTimeout(() => clearMessages(), 3000);
            }
        }
    };

    const handleDeleteProduct = () => {
        if (userInfo?._id) {
            fetchProductsByBaker(userInfo._id);
        }
        // Clear success/error messages after 3 seconds
        setTimeout(() => clearProductMessages(), 3000);
    };

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
                                    <img src={userInfo?.image ? `http://localhost:5000${userInfo.image}` : profileImage} alt={userInfo?.name || 'Profile'} />
                                    <Link to="/edit-profile">изменить</Link>
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
                            {productError && <p className="error-message">{productError}</p>}
                            {productSuccess && <p className="success-message">{productSuccess}</p>}
                            <Link to={'/admin'}><button className="add-pet">Добавить продукт</button></Link>
                            <div className="pets-container">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <ProductCard 
                                            key={product?._id} 
                                            product={product} 
                                            onDelete={handleDeleteProduct}
                                        />
                                    ))
                                ) : (
                                    <p>No products found for this baker.</p>
                                )}
                            </div>
                        </div>

                        {/* Category Management Section */}
                        <div className="categories">
                            <h2>Управление категориями</h2>
                            
                            {/* Messages */}
                            {categoryError && <p className="error-message">{categoryError}</p>}
                            {categorySuccess && <p className="success-message">{categorySuccess}</p>}
                            
                            {/* Create Category Form */}
                            <div className="create-category">
                                <h3>Создать новую категорию</h3>
                                <div className="category-form">
                                    <input
                                        type="text"
                                        placeholder="Название категории"
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                    />
                                    <textarea
                                        placeholder="Описание категории (необязательно)"
                                        value={newCategory.description}
                                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                    />
                                    <button 
                                        onClick={handleCreateCategory} 
                                        disabled={categoryLoading || !newCategory.name.trim()}
                                    >
                                        {categoryLoading ? 'Создание...' : 'Создать категорию'}
                                    </button>
                                </div>
                            </div>

                            {/* Categories List */}
                            <div className="categories-list">
                                <h3>Существующие категории</h3>
                                {categories.length > 0 ? (
                                    <div className="categories-grid">
                                        {categories.map((category) => (
                                            <div key={category._id} className="category-item">
                                                {editingCategory?._id === category._id ? (
                                                    <div className="edit-category">
                                                        <input
                                                            type="text"
                                                            value={editingCategory.name}
                                                            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                                        />
                                                        <textarea
                                                            value={editingCategory.description}
                                                            onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                                                        />
                                                        <div className="edit-buttons">
                                                            <button onClick={() => handleUpdateCategory(category._id)}>
                                                                Сохранить
                                                            </button>
                                                            <button onClick={() => setEditingCategory(null)}>
                                                                Отмена
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="category-display">
                                                        <h4>{category.name}</h4>
                                                        {category.description && <p>{category.description}</p>}
                                                        <div className="category-actions">
                                                            <button onClick={() => setEditingCategory(category)}>
                                                                Редактировать
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteCategory(category._id)}
                                                                className="delete-btn"
                                                            >
                                                                Удалить
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>Категории не найдены.</p>
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
