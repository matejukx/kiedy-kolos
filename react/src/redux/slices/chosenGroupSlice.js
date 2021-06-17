import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

export const chosenGroupSlice = createSlice({
  name: 'chosenGroup',
  initialState: {
    value: 0,
  },
  reducers: {
    setChosenGroup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChosenGroup: setChosenGroup } = chosenGroupSlice.actions;

export default chosenGroupSlice.reducer;
