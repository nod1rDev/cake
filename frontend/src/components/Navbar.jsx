import React from 'react'
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../assets/logo.svg'

const Navbar = () => {
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
                        <button className="profile-button">
                            <FaRegUser />
                            Личный кабинет
                        </button>
                    </nav>
                </Row>
            </Container>
        </>
    )
}

export default Navbar
