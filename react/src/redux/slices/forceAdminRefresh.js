import { createSlice } from '@reduxjs/toolkit';

export const forceAdminRefreshSlice = createSlice({
  name: 'forceAdminRefresh',
  initialState: {
    value: false,
  },
  reducers: {
    forceAdminRefresh: (state, action) => {
      state.value = !state.value;
    },
  },
});

export const { forceAdminRefresh: forceAdminRefresh } = forceAdminRefreshSlice.actions;

export default forceAdminRefreshSlice.reducer;
