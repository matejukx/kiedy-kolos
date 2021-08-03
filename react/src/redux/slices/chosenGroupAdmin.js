import { createSlice } from '@reduxjs/toolkit';

export const chosenGroupAdminSlice = createSlice({
  name: 'chosenGroupAdmin',
  initialState: {
    value: 0,
  },
  reducers: {
    setChosenGroupAdmin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChosenGroupAdmin: setChosenGroupAdmin } = chosenGroupAdminSlice.actions;

export default chosenGroupAdminSlice.reducer;
