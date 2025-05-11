import React from 'react'
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import logo from '/Zarinka_logo.svg'
import { useUserStore } from '../store/User';
import { useEffect } from 'react';

const Navbar = () => {
    const { user, token, setUserData } = useUserStore();

    useEffect(() => {
        // On mount, check if data is in localStorage and set it in Zustand if not present
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken && !user && !token) {
            setUserData({
                user: JSON.parse(storedUser),
                token: storedToken,
            });
        }
    }, [user, token, setUserData]);

    return (
        <>
            <Container>
                <Row>
                    <nav className="mainNav">
                        <div>
                            <Link to={'/catalog'}><img className="logo" src={logo} alt="" /></Link>
                            <button className="catalogue-button">
                                <FaBars />
                                Каталог
                            </button>
                            <form className="menu-header">
                                <NavLink to="#">Оптовые продажи</NavLink>
                                <NavLink to="#">Продажи в рознице</NavLink>
                                <NavLink to="#">Контакты</NavLink>
                                <NavLink to="#">Вакансии</NavLink>
                                <NavLink to="#">Отзывы</NavLink>
                            </form>
                        </div>
                        <Link className="profile-button" to={token && user ? '/profile' : '/register'}>
                            <FaRegUser />
                            {token && user ? 'Профиль' : 'Войти'}
                        </Link>
                    </nav>
                </Row>
            </Container>
        </>
    )
}

export default Navbar
