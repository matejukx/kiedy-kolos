import { createSlice } from '@reduxjs/toolkit';

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    value: [],
  },
  reducers: {
    setGroups: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setGroups: setGroups } = groupsSlice.actions;

export default groupsSlice.reducer;
