import React from 'react'
import './Card.css'
import { cart } from '../assets/images'

const Card = ({ weight, img, kkal, name, price, desc }) => {
    return (
        <>
            <div className="cake-options">
                {/* <img className="new" src={new_icon} alt="new" /> */}

                <img src={img} alt="Пирожное Воздушное 39" className='cake'/>
                <div className="gr-call">
                    <p>{weight}</p>
                    <p>{kkal}</p>
                </div>
                <hr />
                <div className="name-price">
                    <p>{name}</p>
                    <p>{price}</p>
                </div>
                <p className="informationAboutCakes">{desc}</p>


                <button className='cart'><img src={cart} alt="" /> В корзину</button>
            </div>
        </>
    )
}

export default Card
