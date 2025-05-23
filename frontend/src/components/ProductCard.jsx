import React from 'react'
import './ProductCard.css'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    return (
        <>
            <div className="pet-card">
                <div className="pet-card-container">
                    <div className="image-container">
                        <img src="images/Ellipse.png" alt="" />
                        <Link>изменить</Link>

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
