import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

export const chosenEventSlice = createSlice({
  name: 'chosenEvent',
  initialState: {
    value: 0,
  },
  reducers: {
    setChosenEvent: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChosenEvent: setChosenEvent } = chosenEventSlice.actions;

export default chosenEventSlice.reducer;
