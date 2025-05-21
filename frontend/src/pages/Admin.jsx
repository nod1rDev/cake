import React, { useState } from 'react';
import './Admin.css';
import { useProductStore } from '../store/Product';
import macarons from '../assets/macarons.png';
import { useUserStore } from '../store/User';

const Admin = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { createProduct, loading } = useProductStore((state) => ({
    createProduct: state.createProduct,
    loading: state.loading,
  }));

  const { user, token, hydrated } = useUserStore((state) => ({
    user: state.user,
    token: state.token,
    hydrated: state.hydrated,
  }));

  if (!hydrated) {
    return <div>Загрузка...</div>;
  }

  const addProduct = async () => {
    setError('');
    setSuccess('');

    if (!user || !token) {
      setError('Пользователь не аутентифицирован.');
      return;
    }

    const { name, price, image, description } = newProduct;

    if (!name || !price || !image || !description) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setError('Цена должна быть действительным числом больше 0.');
      return;
    }

    const productData = {
      name,
      price: numericPrice,
      image,
      description,
    };

    const result = await createProduct(productData, token);

    if (result.success) {
      setSuccess('Продукт успешно добавлен!');
      setNewProduct({ name: '', price: '', image: '', description: '' });
    } else {
      setError(result.message || 'Не удалось добавить продукт.');
    }
  };

  return (
    <main className='admin-main'>
      <div className='container_add'>
        <div className='form'>
          <img src={macarons} alt='macarons' className='macarons' />
          <h1>Добавьте свой продукт</h1>
          {error && <p className='error-message'>{error}</p>}
          {success && <p className='success-message'>{success}</p>}

          <input
            type='text'
            placeholder='Название продукта'
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type='number'
            min={1}
            placeholder='Цена продукта'
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type='text'
            placeholder='Изображение'
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <textarea
            placeholder='Описание продукта'
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <button onClick={addProduct} disabled={loading}>
            {loading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Admin;