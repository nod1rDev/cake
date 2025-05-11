import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/User';
import AdminProfile from './AdminProfile';
import UserProfile from './UserProfile';
import { useEffect } from 'react';

const Profile = () => {

    const { user } = useUserStore();
    console.log(user?.role);

    const navigate = useNavigate();
    useEffect(() => {
        if (user?.role === 'admin') navigate('/profile');
        else if (user?.role === 'user') navigate('/profile');
    }, [user, navigate]);

    return (
        <>
            {user?.role === 'admin' && <AdminProfile />}
            {user?.role === 'user' && <UserProfile />}
        </>
    );
};

export default Profile;
