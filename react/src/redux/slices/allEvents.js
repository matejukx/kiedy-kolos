import { createSlice } from '@reduxjs/toolkit';

export const allEventsSlice = createSlice({
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

export const { setAllEvents: setAllEvents } = allEventsSlice.actions;

export default allEventsSlice.reducer;
