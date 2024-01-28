// AddQuestion.js

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { _saveQuestion } from '../_DATA';
import { createQuestion } from '../actions/questionsSlice';
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authSlice.user);
  const navigate = useNavigate();

  const [options, setOptions] = useState({
    optionOneText: '',
    optionTwoText: '',
    author: authUser.id, // تمرير authUser.id كمعرف للمؤلف

  });

  const handleInputChange = (e, option) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: e.target.value,
    }));
  };

  const handleCreateQuestion = async () => {
    try {
      const newQuestion = await _saveQuestion({
        optionOneText: options.optionOneText,
        optionTwoText: options.optionTwoText,
        author: authUser.id, // تغيير هنا
      });

      dispatch(createQuestion(newQuestion));

      // يمكنك إعادة توجيه المستخدم إلى صفحة أخرى بعد إنشاء السؤال
      navigate('/Home');
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Question</h2>
      <div>
        <label>
          Option One:
          <input
            type="text"
            value={options.optionOneText}
            onChange={(e) => handleInputChange(e, 'optionOneText')}
          />
        </label>
      </div>
      <div>
        <label>
          Option Two:
          <input
            type="text"
            value={options.optionTwoText}
            onChange={(e) => handleInputChange(e, 'optionTwoText')}
          />
        </label>
      </div>
      <button onClick={handleCreateQuestion}>Create Question</button>
    </div>
  );
};

export default AddQuestion;
