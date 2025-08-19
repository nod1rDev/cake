import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { useUserStore } from '../store/User';
import logo from '/Zarinka_logo.svg';
import Row from 'react-bootstrap/Row';
import CategoryMenu from './CategoryMenu';

const Navbar = () => {
    const { user, token, setUserData } = useUserStore();
    const [catalogOpen, setCatalogOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (
            storedUser &&
            storedUser !== "undefined" &&
            storedToken &&
            !user &&
            !token
        ) {
            try {
                setUserData({
                    user: JSON.parse(storedUser),
                    token: storedToken,
                });
            } catch (e) {
                localStorage.removeItem('user');
                console.log(e);
            }
        }
    }, [user, token, setUserData]);

    return (
        <>
            <Row>
                <nav className="mainNav">
                    <div className="container">
                        <div className='block'>
                            <Link to='/'><img className="logo" src={logo} alt="Zarinka logo" /></Link>

                            {/* Toggleable Catalog Button */}
                            {/* <button
                                className="catalog-button"
                                onClick={() => setCatalogOpen(prev => !prev)}
                            >
                                <FaBars className="menu-icon" />
                                Каталог
                            </button> */}

                            <CategoryMenu />

                            {/* Toggleable Menu */}
                            {catalogOpen && (
                                <div className="catalog-dropdown">
                                    <Link to="/category/cakes">Торты</Link>
                                    <Link to="/category/cupcakes">Капкейки</Link>
                                    <Link to="/category/macarons">Макаруны</Link>
                                    <Link to="/category/cookies">Печенье</Link>
                                </div>
                            )}

                            <form className="menu-header">
                                <NavLink to="/cakes">Browse Cakes</NavLink>
                                <NavLink to="/custom">Custom cakes</NavLink>
                                <NavLink to="/bakers">Bakers</NavLink>
                                <NavLink to="/contact">Contact</NavLink>
                                <NavLink to="/help">Help</NavLink>
                            </form>
                        </div>

                        <div className='icons'>
                            <Link className='cart-icon' to='/cart'><IoCartOutline /></Link>
                            <Link className="profile-button" to={token && user ? '/profile' : '/register'}>
                                <FaRegUser />
                                {token && user ? 'Профиль' : 'Войти'}
                            </Link>
                        </div>
                    </div>
                </nav>
            </Row>
        </>
    );
};

export default Navbar;
