import { useEffect } from 'react';
import { useUserStore } from '../store/User';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { userInfo, errorMessage, isLoadingProfile, fetchProfile, logoutUser } = useUserStore();

    useEffect(() => {
        console.log('calling fetchProfile');
        fetchProfile();
    }, [fetchProfile]);

    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/register'); // Navigate to login page after logout
    };

    return (
        <div>
            <h2>Your Profile</h2>

            {/* Display error message if any */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {/* Show loading state while fetching */}
            {isLoadingProfile ? (
                <p>Loading profile...</p>
            ) : (
                userInfo && (
                    <div>
                        <p>Name: {userInfo.name}</p>
                        <p>Email: {userInfo.email}</p>
                        {/* Add more fields as needed */}
                    </div>
                )
            )}

            {/* Logout Button */}
            <button onClick={handleLogout}>Logout</button>

            <h1>USER</h1>
        </div>
    );
};

export default UserProfile;
