import React, { useEffect, useState } from 'react';
import './Admin.css';
import { useProductStore } from '../store/Product';
import { useUserStore } from '../store/User';
import macarons from '../assets/macarons.png';

const Admin = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
  });

  const [message, setMessage] = useState({ error: '', success: '' });

  const { createProduct, loading, error } = useProductStore((state) => ({
    createProduct: state.createProduct,
    loading: state.loading,
    error: state.error,
  }));

  const { user, token } = useUserStore((state) => ({
    user: state.user,
    token: state.token,
  }));

  useEffect(() => {
    console.log("createProduct changed:", createProduct);
  }, [createProduct]); // This will only log when createProduct reference changes

  useEffect(() => {
    console.log("User or Token changed:", user, token);
  }, [user, token]); // This will only log when user or token values change

  const addProduct = async () => {
    setMessage({ error: '', success: '' });

    if (!user || !token) {
      setMessage({ error: 'Пользователь не аутентифицирован.', success: '' });
      return;
    }

    const { name, price, image, description } = newProduct;

    if (!name || !price || !image || !description) {
      setMessage({ error: 'Пожалуйста, заполните все поля.', success: '' });
      return;
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setMessage({ error: 'Цена должна быть действительным числом больше 0.', success: '' });
      return;
    }

    const result = await createProduct(
      {
        name,
        price: numericPrice,
        image,
        description,
      },
      token
    );

    if (result.success) {
      setMessage({ success: 'Продукт успешно добавлен!', error: '' });
      setNewProduct({ name: '', price: '', image: '', description: '' });
    } else {
      setMessage({ error: result.message || 'Не удалось добавить продукт.', success: '' });
    }
  };

  return (
    <main className="admin-main">
      <div className="container_add">
        <div className="form">
          <img src={macarons} alt="macarons" className="macarons" />
          <h1>Добавьте свой продукт</h1>

          {message.error && <p className="error-message">{message.error}</p>}
          {message.success && <p className="success-message">{message.success}</p>}
          {error && !message.error && <p className="error-message">{error}</p>}

          <input
            type="text"
            placeholder="Название продукта"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            min={1}
            placeholder="Цена продукта"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Изображение"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <textarea
            placeholder="Описание продукта"
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
