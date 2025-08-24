import React from 'react';
import './BakerCard.css';
import profile from '../assets/profile.jpg';
import { FaStar } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/User.js';
import toast from 'react-hot-toast';

const BakerCard = ({ baker }) => {
    const { token, bakerFavorites, addBakerFavorite, removeBakerFavorite } = useUserStore();

    const isFavorite = bakerFavorites?.some(fav => fav._id === baker._id);

    const handleToggleFavorite = async (e) => {
        e.preventDefault(); // prevent navigation if card is clickable
        if (!token) return toast.error("Please log in to save favorites.");

        try {
            if (isFavorite) {
                await removeBakerFavorite(baker._id);
                toast.success("Removed from favorites");
            } else {
                await addBakerFavorite(baker);
                toast.success("Added to favorites");
            }
        } catch (err) {
            toast.error("Could not update favorites.");
            console.error("❌ Favorite error:", err);
        }
    };

    return (
        <div className="specialist">
            <div className="specialist-photo">
                <img
                    src={baker.img ? `http://localhost:5000/uploads/${baker.img}` : profile}
                    alt={baker.bakery || 'Baker'}
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
                    <span className="hashtag">hashtag</span>
                </div>
                <div className="btns">
                    <Link to={`/bakers/${baker._id}`} className='view'>View Profile</Link>
                    <button
                        className='like'
                        onClick={handleToggleFavorite}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BakerCard;
