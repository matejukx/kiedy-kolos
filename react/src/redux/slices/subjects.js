import { createSlice } from '@reduxjs/toolkit';

export const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: {
    value: [],
  },
  reducers: {
    setSubjects: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSubjects: setSubjects } = subjectsSlice.actions;

export default subjectsSlice.reducer;
