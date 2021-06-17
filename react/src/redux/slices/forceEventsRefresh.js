import { createSlice } from '@reduxjs/toolkit';

export const forceEventsRefreshSlice = createSlice({
  name: 'forceEventsRefresh',
  initialState: {
    value: [],
  },
  reducers: {
    forceEventsRefresh: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { forceEventsRefresh: forceEventsRefresh } = forceEventsRefreshSlice.actions;

export default forceEventsRefreshSlice.reducer;
