import React, { useState, useEffect } from 'react';
import './Admin.css';
import { useProductStore } from '../store/Product';
import { useUserStore } from '../store/User';
import { useParams, useNavigate } from 'react-router-dom';
import macarons from '../assets/macarons.png';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState({ error: '', success: '' });

  const { fetchCategories, categories } = useProductStore();
  const { user, token } = useUserStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    // Fetch the specific product data
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        
        if (res.ok) {
          setProduct({
            name: data.data.name || '',
            price: data.data.price || '',
            description: data.data.description || '',
            category: data.data.category?._id || '',
          });
        } else {
          setMessage({ error: 'Продукт не найден', success: '' });
        }
      } catch (error) {
        setMessage({ error: 'Ошибка загрузки продукта', success: '' });
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const updateProduct = async () => {
    try {
      setMessage({ error: '', success: '' });

      if (!user || !token) {
        setMessage({ error: 'Пользователь не аутентифицирован.', success: '' });
        return;
      }

      if (!product.name || !product.price || !product.description || !product.category) {
        setMessage({ error: 'Пожалуйста, заполните все поля.', success: '' });
        return;
      }

      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('description', product.description);
      formData.append('category', product.category);
      
      if (newImage) {
        formData.append('image', newImage);
      }

      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ success: 'Продукт успешно обновлен!', error: '' });
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        setMessage({ error: data.message || 'Не удалось обновить продукт.', success: '' });
      }
    } catch (err) {
      console.error('Ошибка при обновлении продукта:', err);
      setMessage({ error: 'Произошла ошибка, попробуйте еще раз.', success: '' });
    }
  };

  return (
    <main className="admin-main">
      <div className="container_add">
        <div className="form">
          <img src={macarons} alt="macarons" className="macarons" />
          <h1>Редактировать продукт</h1>

          {message.error && <p className="error-message">{message.error}</p>}
          {message.success && <p className="success-message">{message.success}</p>}

          <input
            type="text"
            placeholder="Название продукта"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <input
            type="number"
            min={1}
            placeholder="Цена продукта"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImage(e.target.files[0])}
          />
          <select
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            required
          >
            <option value="">Выберите категорию</option>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option value="" disabled>Загрузка категорий...</option>
            )}
          </select>
          <textarea
            placeholder="Описание продукта"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />

          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <button onClick={updateProduct}>
              Обновить
            </button>
            <button 
              onClick={() => navigate('/profile')}
              style={{ backgroundColor: '#95a5a6' }}
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditProduct; 