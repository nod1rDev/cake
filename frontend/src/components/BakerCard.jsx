import React from 'react'
import './BakerCard.css'
import profile from '../assets/profile.jpg'
import { FaStar } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const BakerCard = ({ baker }) => {
    console.log(baker);
    return (
        <>
            <div className="specialist">
                <div className="specialist-photo">
                    <img
                        src={baker.img ? `http://localhost:5000/uploads/${baker.img}` : profile}
                        alt=""
                    />
                </div>
                <div className="specialist-info">
                    <h3>{baker.bakery || 'Sweet Dreams Bakery'}</h3>
                    <span>by {baker.name}</span>
                    <div className="rate_address">
                        <div className="rate">
                            <FaStar /> {baker.rate || 5}
                        </div>
                        <div className="address">
                            <IoLocationOutline /> {baker.city || 'Almalyk'}
                        </div>
                    </div>
                    <div className="hashtags">
                        {/* {baker.hashtags && baker.hashtags.map((tag, index) => (
                            <span key={index} className="hashtag">{tag}</span>
                        ))}  */}

                        <span className="hashtag">hashtag</span>
                    </div>
                    <div className="btns">
                        <Link to={`/bakers/${baker._id}`} className='view'>View Profile</Link>
                        <button className='like'><FaRegHeart /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BakerCard
