import React from 'react'
import './BakerCard.css'
import profile from '../assets/profile.jpg'

const BakerCard = ({ baker }) => {
    return (
        <>
            <div class="specialist">
                <div class="specialist-photo">
                    <img src={baker.img || profile} alt="" />
                    {/* <p>стаж 4 года</p> */}
                </div>
                <div class="specialist-info">
                    <div class=" specialist-info-item specialist-name">
                        <h4>пекарь</h4>
                        <p>{baker.name}</p>
                    </div>
                    <div class="specialist-info-item specialist-position">
                        <h4>информация</h4>
                        <p>{baker.about}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BakerCard
