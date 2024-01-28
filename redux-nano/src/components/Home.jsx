// Home.js

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../actions/usersSlice"; // Update the path accordingly
import { createQuestion, getQuestions } from "../actions/questionsSlice"; // Import the action accordingly
import { _getQuestions } from "../_DATA"; // Import the correct path
import QuestionCard from "./QuestionCard";

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions); // Make sure you have a questions slice in your store

  const authUser = useSelector((state) => state.authSlice.user);
  const currentUser = authUser.id;


  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(getQuestions());
  }, [dispatch,questions]);

  const categorizeQuestions = (currentUser, users, questions) => {
    const userAnswers = users[currentUser]?.answers || {};
    const newQuestions = {};
    const oldQuestions = {};

    Object.keys(questions).forEach((questionId) => {
      if (questionId in userAnswers) {
        oldQuestions[questionId] = questions[questionId];
      } else {
        newQuestions[questionId] = questions[questionId];
      }
    });

    return { newQuestions, oldQuestions };
  };

  const { newQuestions, oldQuestions } = categorizeQuestions(
    currentUser,
    users,
    questions
  );

  return (
    <div
      style={{ margin: 5, display: "flex", flexDirection: "column", gap: 20 }}
    >
      <h2>New Questions</h2>
      <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        {Object.values(newQuestions).map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            users={users}
            currentUser={currentUser}
          />
        ))}
      </div>

      <h2>Old Questions</h2>
      <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        {Object.values(oldQuestions).map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            users={users}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
