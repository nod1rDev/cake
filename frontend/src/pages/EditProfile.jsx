import React, { useState, useEffect } from 'react';
import './Admin.css'; // Reuse admin styles
import { useUserStore } from '../store/User';
import { useNavigate } from 'react-router-dom';
import macarons from '../assets/macarons.png';
import profileImage from '../assets/profile.jpg';

const EditProfile = () => {
    const navigate = useNavigate();
    const { userInfo, fetchProfile, token } = useUserStore();

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
    });
    const [newImage, setNewImage] = useState(null);
    const [message, setMessage] = useState({ error: '', success: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    useEffect(() => {
        if (userInfo) {
            setProfile({
                name: userInfo.name || '',
                email: userInfo.email || '',
                phone: userInfo.phone || '',
                bio: userInfo.bio || '',
            });
        }
    }, [userInfo]);

    const handleUpdateProfile = async () => {
        try {
            setIsLoading(true);
            setMessage({ error: '', success: '' });

            if (!profile.name.trim()) {
                setMessage({ error: 'Имя обязательно для заполнения', success: '' });
                return;
            }

            const formData = new FormData();
            formData.append('name', profile.name);
            formData.append('email', profile.email);
            formData.append('phone', profile.phone);
            formData.append('bio', profile.bio);
            
            if (newImage) {
                formData.append('image', newImage);
            }

            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ success: 'Профиль успешно обновлен!', error: '' });
                // Refresh user data
                fetchProfile();
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
            } else {
                setMessage({ error: data.message || 'Не удалось обновить профиль.', success: '' });
            }
        } catch (err) {
            console.error('Ошибка при обновлении профиля:', err);
            setMessage({ error: 'Произошла ошибка, попробуйте еще раз.', success: '' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="admin-main">
            <div className="container_add">
                <div className="form">
                    <img src={macarons} alt="macarons" className="macarons" />
                    <h1>Редактировать профиль</h1>

                    {message.error && <p className="error-message">{message.error}</p>}
                    {message.success && <p className="success-message">{message.success}</p>}

                    <div className="current-image">
                        <img 
                            src={userInfo?.image ? `http://localhost:5000${userInfo.image}` : profileImage} 
                            alt="Current profile" 
                            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <p>Текущее фото профиля</p>
                    </div>

                    <input
                        type="text"
                        placeholder="Имя"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                    <input
                        type="tel"
                        placeholder="Телефон"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewImage(e.target.files[0])}
                    />
                    <textarea
                        placeholder="О себе"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />

                    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                        <button onClick={handleUpdateProfile} disabled={isLoading}>
                            {isLoading ? 'Обновление...' : 'Обновить профиль'}
                        </button>
                        <button 
                            onClick={() => navigate('/profile')} 
                            style={{ backgroundColor: '#95a5a6' }}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EditProfile; 