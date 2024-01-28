// Home.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../actions/usersSlice'; // Update the path accordingly
import { createQuestion } from '../actions/questionsSlice'; // Import the action accordingly
import { _getQuestions } from '../_DATA' // Import the correct path

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions); // Make sure you have a questions slice in your store

  
  useEffect(() => {
    const fetchData = async () => {
      const usersData = await fetchUsers();
      const questionsData = await _getQuestions();

      dispatch(createQuestion(usersData));
      dispatch(createQuestion(questionsData));
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {Object.keys(users).map((userId) => {
          const user = users[userId];

          return (
            <li key={userId}>
              <h2>Name: {user.name}</h2>

              <div>
                <h3>Unanswered Questions:</h3>
                <ul>
                  {user.questions.map((questionId) => {
                    const question = questions[questionId];

                    // Check if the question and its options are defined
                    if (question && question.optionOne && question.optionTwo) {
                      if (
                        !question.optionOne.votes.includes(userId) &&
                        !question.optionTwo.votes.includes(userId)
                      ) {
                        return (
                          <li key={questionId}>
                            {question.optionOne.text} or {question.optionTwo.text}
                          </li>
                        );
                      }
                    }

                    return null;
                  })}
                </ul>
              </div>

              <div>
                <h3>Answered Questions:</h3>
                <ul>
                  {user.questions.map((questionId) => {
                    const question = questions[questionId];

                    // Check if the question and its options are defined
                    if (question && question.optionOne && question.optionTwo) {
                      if (
                        question.optionOne.votes.includes(userId) ||
                        question.optionTwo.votes.includes(userId)
                      ) {
                        return (
                          <li key={questionId}>
                            You answered: {user.answers[questionId]}
                          </li>
                        );
                      }
                    }

                    return null;
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
