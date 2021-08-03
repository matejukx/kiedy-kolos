import { createSlice } from '@reduxjs/toolkit';

export const dailyEventsSlice = createSlice({
  name: 'dailyEvents',
  initialState: {
    value: [],
  },
  reducers: {
    setDailyEvents: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDailyEvents: setDailyEvents } = dailyEventsSlice.actions;

export default dailyEventsSlice.reducer;
