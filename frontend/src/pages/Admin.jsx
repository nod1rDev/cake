import React, { useState } from 'react';
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

  const createProduct = useProductStore(state => state.createProduct);
  const loading = useProductStore(state => state.loading);
  const error = useProductStore(state => state.error);

  const user = useUserStore(state => state.user);
  const token = useUserStore(state => state.token);

  const addProduct = async () => {
    try {
      setMessage({ error: '', success: '' });

      const { name, price, image, description } = newProduct;

      if (!user || !token) {
        setMessage({ error: 'Пользователь не аутентифицирован.', success: '' });
        return;
      }

      if (!name || !price || !image || !description) {
        setMessage({ error: 'Пожалуйста, заполните все поля.', success: '' });
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('image', image); // If you're uploading an image file, this must be a File, not a string URL!
      formData.append('description', description);

      const result = await createProduct(formData, token);

      if (result.success) {
        setMessage({ success: 'Продукт успешно добавлен!', error: '' });
        setNewProduct({ name: '', price: '', image: '', description: '' });
      } else {
        setMessage({ error: result.message || 'Не удалось добавить продукт.', success: '' });
      }
    } catch (err) {
      console.error('Ошибка при добавлении продукта:', err);
      setMessage({ error: 'Произошла ошибка, попробуйте еще раз.', success: '' });
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
            type="file"
            accept="image/*"
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
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
