import { createSlice } from '@reduxjs/toolkit';

export const chosenGroupIDSlice = createSlice({
  name: 'chosenGroupID',
  initialState: {
    value: 0,
  },
  reducers: {
    setChosenGroupID: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChosenGroupID: setChosenGroupID } = chosenGroupIDSlice.actions;

export default chosenGroupIDSlice.reducer;
