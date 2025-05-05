import React from 'react'
import { useState } from 'react'
import './Admin.css'
import { useProductStore } from '../store/Product'
import macarons from '../assets/macarons.png'

const Admin = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    })

    const { createProduct } = useProductStore()

    const addProduct = async () => {
        const { success, message } = await createProduct(newProduct)
        console.log("Success:", success);
        console.log("Message:", message);

        setNewProduct({ name: "", price: "", image: "" })
    }

    return (
        <main className='admin-main'>
            <div className='container_add'>
                <div className="form">
                    <img src={macarons} alt="" className='macarons' />
                    <h1>Добавьте свою продукту</h1>
                    <input
                        type="text"
                        placeholder='Название продукта'
                        name='name'
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <input
                        type="number"
                        min={1}
                        placeholder='Цена продукта'
                        name='price'
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder='Изображение'
                        name='image'
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    />

                    <textarea name="desc" id="" placeholder='Описани продукта'></textarea>

                    <button onClick={addProduct}>Добавить</button>
                </div>
            </div>
        </main>
    )
}

export default Admin
