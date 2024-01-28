import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { _getUsers, _saveQuestion } from '../_DATA';
import { login, logout } from '../actions/Creat_Users';
import { createQuestion } from '../actions/questionsSlice'; // استبدل بالمسار الصحيح
import { useNavigate } from "react-router-dom";

const UserManager = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.authSlice.isAuthenticated);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  

  const handleLogin = async () => {
    try {
      const users = await _getUsers();
      const { username, password } = user;
  
      if (users[username] && users[username].password === password) {
        // إرسال العملية إلى Redux لتحديث حالة المصادقة والمستخدم
        dispatch(login(users[username])); // تأكد من أنه يرسل بشكل صحيح
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

  const handleCreateQuestion = async () => {
    try {
      const { username } = user;
      const newQuestion = await _saveQuestion({
        optionOneText: 'Option One',
        optionTwoText: 'Option Two',
        author: username,
      });

      dispatch(createQuestion(newQuestion));
      console.log('New question created:', newQuestion);

      // توجيه المستخدم إلى صفحة إضافة السؤال بعد الإنشاء
      navigate('/addQuestion');
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          {/* <p>Welcome, {user.username}!</p> */}
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleCreateQuestion}>Create Question</button>
        </>
      ) : (
        <>
          <label>
            Username:
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default UserManager;
