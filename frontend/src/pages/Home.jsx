import React, { useEffect, useState } from 'react';
import { LuCake, LuChefHat } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import { Link } from 'react-router-dom';
import './Home.css';
import BakerCard from '../components/BakerCard';
import axios from 'axios';

const Home = () => {
  const [bakers, setBakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBakers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/bakers');
        console.log('Fetched bakers:', res.data);
        setBakers(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bakers:', err);
        setError('Failed to load bakers.');
        setLoading(false);
      }
    };

    fetchBakers();
  }, []);

  return (
    <>
      <div className="hero">
        <div className="container">
          <h1>Custom Cakes Made with Love</h1>
          <p>
            Connect with local artisan bakers and create the perfect cake for your special moments.
            From custom designs to ready-made delights, we bring sweetness to your celebrations.
          </p>
          <div className="btns">
            <button><LuCake /> Build Custom Cake</button>
            <button>Browse Ready-Made</button>
          </div>
        </div>
      </div>

      <section className='why'>
        <div className="container">
          <h2>Why Choose Zarinka?</h2>
          <p className='context'>
            We connect you with passionate local bakers who create exceptional custom cakes and baked goods
          </p>

          <div className="features">
            <div className="feature">
              <div className="img"><LuChefHat /></div>
              <h3>Expert Bakers</h3>
              <p>Skilled artisan bakers with years of experience and passion for their craft</p>
            </div>
            <div className="feature">
              <div className="img"><LuCake /></div>
              <h3>Custom Designs</h3>
              <p>Create unique cakes tailored to your vision with our interactive cake builder</p>
            </div>
            <div className="feature">
              <div className="img"><MdAccessTime /></div>
              <h3>Real-time Tracking</h3>
              <p>Follow your order from preparation to completion with live progress updates</p>
            </div>
          </div>
        </div>
      </section>

      <section className='bakers_home'>
        <div className="container">
          <div className="top">
            <h2>Featured Bakers</h2>
            <Link to={'/bakers'} className='viewAll'>View All Bakers</Link>
          </div>

          <div className="list_bakers">
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="bakers-list">
              {bakers.map((baker, index) => (
                <BakerCard key={index} baker={baker} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cakes">
        <div className="container">
          <div className="top">
            <h2>Popular Cakes</h2>

            <Link to={'/catalog'} className='viewAll'>View All Cakes</Link>
          </div>

          <div className="product_cards">
              
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
