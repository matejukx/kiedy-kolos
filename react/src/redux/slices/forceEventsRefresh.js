import { createSlice } from '@reduxjs/toolkit';

export const forceEventsRefreshSlice = createSlice({
  name: 'forceEventsRefresh',
  initialState: {
    value: false,
  },
  reducers: {
    forceEventsRefresh: (state, action) => {
      state.value = !state.value;
    },
  },
});

export const { forceEventsRefresh: forceEventsRefresh } = forceEventsRefreshSlice.actions;

export default forceEventsRefreshSlice.reducer;
