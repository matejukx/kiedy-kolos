import { createSlice } from '@reduxjs/toolkit';

export const chosenSubjectSlice = createSlice({
  name: 'chosenSubject',
  initialState: {
    value: 0,
  },
  reducers: {
    setChosenSubject: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChosenSubject: setChosenSubject } = chosenSubjectSlice.actions;

export default chosenSubjectSlice.reducer;
