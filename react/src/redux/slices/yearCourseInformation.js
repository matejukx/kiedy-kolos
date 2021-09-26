import { createSlice } from '@reduxjs/toolkit';

export const yearCourseInformationSlice = createSlice({
  name: 'yearCourseInformation',
  initialState: {
    value: 0,
  },
  reducers: {
    setYearCourseInformation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setYearCourseInformation: setYearCourseInformation } = yearCourseInformationSlice.actions;

export default yearCourseInformationSlice.reducer;
