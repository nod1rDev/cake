import React, { useState } from 'react'
import './ProductCard.css'
import { Link } from 'react-router-dom'
import { useUserStore } from '../store/User'
import { useProductStore } from '../store/Product'

const ProductCard = ({ product, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const { token } = useUserStore()
    const { deleteProduct } = useProductStore()

    const handleDelete = async () => {
        if (!window.confirm('Вы уверены, что хотите удалить этот продукт?')) {
            return
        }

        setIsDeleting(true)
        try {
            const result = await deleteProduct(product._id, token)
            
            if (result.success) {
                if (onDelete) {
                    onDelete()
                }
            } else {
                alert(result.message || 'Ошибка при удалении продукта')
            }
        } catch (error) {
            console.error('Error deleting product:', error)
            alert('Произошла ошибка при удалении продукта')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
            <div className="pet-card">
                <div className="pet-card-container">
                    <div className="image-container">
                        <img src={`http://localhost:5000${product.image}`} alt={product.name} />
                        <div className="action-buttons">
                            <Link to={`/edit-product/${product._id}`}>изменить</Link>
                            <button 
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="delete-btn"
                            >
                                {isDeleting ? 'Удаление...' : 'удалить'}
                            </button>
                        </div>
                    </div>
                    <div className="pet-card-container-left">
                        <h2>{product?.name}</h2>
                        <div className="info-pair">
                            <h3>цена</h3>
                            <p>{product.price}</p>
                        </div>
                        {/* <div className="info-pair">
                            <h3>пол</h3>
                            <p>Мужской</p>
                        </div>
                        <div className="info-pair">
                            <h3>Порода</h3>
                            <p>Лабрадор</p>
                        </div>
                        <div className="info-pair">
                            <h3>Возраст</h3>
                            <p>1 год 2 месяца</p>
                        </div> */}
                    </div>
                </div>

                <div className="otherInformation">
                    <h3>Дополнительная информация</h3>
                    <p>{product.description}</p>

                </div>
            </div>
        </>
    )
}

export default ProductCard
