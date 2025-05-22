import React, { useState } from 'react';
import macarons from '../assets/macarons.png';
import './Auth.css';
import { useUserStore } from '../store/User';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
<<<<<<< HEAD
import { jwtDecode } from 'jwt-decode';
=======
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213

const Auth = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
<<<<<<< HEAD
        role: "",
        bio: "",
        phone: ""
    });

    const [imageFile, setImageFile] = useState(null);
=======
        role: ""
    });
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and registration
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages

    const { createUser, loginUser } = useUserStore(); // Assuming you have a loginUser function
    const navigate = useNavigate();

    const handleUserAction = async () => {
        let response;
<<<<<<< HEAD

        if (isLogin) {
            response = await loginUser({ email: newUser.email, password: newUser.password });
        } else {
            const formData = new FormData();
            Object.entries(newUser).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    formData.append(key, value);
                }
            });
            if (imageFile) formData.append('image', imageFile);

            response = await createUser(formData);
=======
        if (isLogin) {
            // Handle login
            response = await loginUser({ email: newUser.email, password: newUser.password });
        } else {
            // Handle registration
            response = await createUser(newUser);
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
        }

        const { success, token, message, userData } = response || {};

        if (success) {
<<<<<<< HEAD
            try {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));

                const decoded = jwtDecode(token);
                const expiryTime = decoded.exp * 1000;
                localStorage.setItem('expiryTime', expiryTime);

                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = '/login';
                }, expiryTime - Date.now());

                navigate(userData?.role === 'admin' ? '/profile' : '/catalog');
            } catch (decodeError) {
                console.error("JWT Decode failed:", decodeError);
                localStorage.clear();
                setErrorMessage("Ошибка авторизации. Попробуйте снова.");
            }
        } else {
            setErrorMessage(message || "Произошла ошибка. Попробуйте снова.");
=======
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
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
        }
    };


<<<<<<< HEAD


    // const { user, token } = useUserStore();
=======
    const { user, token } = useUserStore();
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213

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
<<<<<<< HEAD
        const token = localStorage.getItem('token');
        const expiryTime = localStorage.getItem('expiryTime');

        if (token && expiryTime) {
            const now = Date.now();
            const expiry = Number(expiryTime);

            if (isNaN(expiry) || now > expiry) {
                localStorage.clear();
                navigate('/login');
            } else {
                // Optional: auto-logout timer
                const remainingTime = expiry - now;
                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = '/login';
                }, remainingTime);

                navigate('/profile');
            }
        }
    }, [navigate]);

    // console.log("Token for decoding:", token);
=======
        if (user && token) {
            navigate('/profile'); // or wherever you want to redirect them
        }
    }, [user, token, navigate]);
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213

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
<<<<<<< HEAD
                            <>
                                <input type="text" name="phone" placeholder="Phone number" onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                                <select
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="" disabled>Выберите роль</option>
                                    <option value={"user"}>Пользователь</option>
                                    <option value={"admin"}>Кондитерь</option>
                                </select>
                                <textarea name="bio" placeholder="About you" onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}></textarea>
                            </>
                        )}
                        <button className='submit' onClick={handleUserAction}>
=======
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
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
                            {isLogin ? "Войти" : "Добавить"}
                        </button>
                        {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
                        <button
<<<<<<< HEAD
                            className='switch'
                            // style={{ marginTop: '10px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
=======
                            style={{ marginTop: '10px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
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

            {/* <section class="logIn">
                <h2>Авторизация</h2>
                <form>

                    <input class="email" placeholder="Ваша почта" type="text" required />
                    <input class="password" placeholder="Пароль" type="text" required />

                    <button class="next">Продолжить</button>
                </form>
                <a class="registerLink" href="#">Нет аккаунта? Зарегистрируйтесь </a>

            </section> */}
        </>
    );
};

<<<<<<< HEAD
export default Auth;
=======
export default Auth;
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
