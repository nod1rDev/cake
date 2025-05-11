// src/components/Profile.jsx
import { useEffect } from 'react';
import {useUserStore} from '../store/User';

const Profile = () => {
  const { userInfo, errorMessage, fetchProfile } = useUserStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div>
      <h2>Your Profile</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {userInfo ? (
        <div>
          <p>{userInfo.name}</p>
        </div>
      ) : (
        !errorMessage && <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
