import React, { useState } from 'react';
import macarons from '../assets/macarons.png';
import './Auth.css';
import { useUserStore } from '../store/User';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Auth = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and registration
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages

    const { createUser, loginUser } = useUserStore(); // Assuming you have a loginUser function
    const navigate = useNavigate();

    const handleUserAction = async () => {
        let response;
        if (isLogin) {
            // Handle login
            response = await loginUser({ email: newUser.email, password: newUser.password });
        } else {
            // Handle registration
            response = await createUser(newUser);
        }

        const { success, token, message, userData } = response || {};

        if (success) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            console.log("User data:", userData);
            // Use role to determine redirect path
            if (userData.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } else {
            setErrorMessage(message || "An error occurred. Please try again.");
        }
    };


    const { user, token } = useUserStore();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');

    //     if (user || token) {
    //         // Optionally parse role from localStorage if needed
    //         const storedUser = JSON.parse(localStorage.getItem('user'));
    //         const role = storedUser?.role;

    //         // Redirect based on role
    //         if (role === 'admin') {
    //             navigate('/profile');
    //         } else {
    //             navigate('/profile');
    //         }
    //     }
    // }, [navigate, user]);

    useEffect(() => {
        if (user && token) {
            navigate('/profile'); // or wherever you want to redirect them
        }
    }, [user, token, navigate]);

    return (
        <>
            <main className='admin-main'>
                <div className='container_add'>
                    <div className="form">
                        <img src={macarons} alt="" className='macarons' />
                        <h1>{isLogin ? "Вход" : "Регистрация"}</h1>
                        {!isLogin && (
                            <input
                                type="text"
                                placeholder='Имя'
                                name='name'
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            />
                        )}
                        <input
                            type="text"
                            placeholder='Электронная почта'
                            name='email'
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder='Пароль'
                            name='password'
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                        {!isLogin && (
                            <select
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            >
                                <option value="" disabled>Выберите роль</option>
                                <option value={"user"}>Пользователь</option>
                                <option value={"admin"}>Кондитерь</option>
                            </select>
                        )}
                        <button onClick={handleUserAction}>
                            {isLogin ? "Войти" : "Добавить"}
                        </button>
                        {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
                        <button
                            style={{ marginTop: '10px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setErrorMessage('');
                                setNewUser({ name: '', email: '', password: '', role: '' });
                            }}
                        >
                            {isLogin ? "Нет аккаунта? Зарегистрируйтесь" : "Уже есть аккаунт? Войти"}
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Auth;
