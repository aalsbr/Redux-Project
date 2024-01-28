import { useSelector } from 'react-redux';

const UserProfile = () => {
  const user = useSelector((state) => state.authSlice.user);

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <div>
          <p>Username: {user.name}</p>
          <img src={user.avatarURL} alt="User Avatar" />
          
          {/* أضف معلومات إضافية إذا كانت متوفرة */}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
