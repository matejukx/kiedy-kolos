import { createSlice } from '@reduxjs/toolkit';

export const allEvents = createSlice({
  name: 'allEvents',
  initialState: {
    value: [],
  },
  reducers: {
    setAllEvents: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAllEvents: setAllEvents } = allEvents.actions;

export default allEvents.reducer;
