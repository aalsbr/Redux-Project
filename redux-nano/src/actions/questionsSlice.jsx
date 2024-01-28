// questionsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {},
  reducers: {
    createQuestion: (state, action) => {
      const { payload: newQuestion } = action;
      state[newQuestion.id] = newQuestion;
    },
  },
});

export const { createQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;
