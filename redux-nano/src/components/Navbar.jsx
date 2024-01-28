

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { _getUsers } from '../_DATA';
import { login, logout } from '../actions/Creat_Users';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.authSlice.isAuthenticated);
  const user = useSelector((state) => state.authSlice.user);
  const navigate = useNavigate();
console.log(user);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const users = await _getUsers();
      const { username, password } = loginData;
  
      if (users[username] && users[username].password === password) {
      
        dispatch(login(users[username]));
        navigate('/addQuestion'); 
      } else {
        console.log('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <ul>
      
        {isAuthenticated ? (
          <li>
            <span>Welcome, {user.name}!</span>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li>
            <input
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button onClick={handleLogin}>Login</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
