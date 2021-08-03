import { createSlice } from '@reduxjs/toolkit';

export const monthOffsetSlice = createSlice({
  name: 'monthOffset',
  initialState: {
    value: 0,
  },
  reducers: {
    incrementMonthOffset: (state) => {
      state.value += 1;
    },
    decrementMonthOffset: (state) => {
      state.value -= 1;
    },
    setMonthOffset: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  incrementMonthOffset: incrementMonthOffset,
  decrementMonthOffset: decrementMonthOffset,
  setMonthOffset: setMonthOffset,
} = monthOffsetSlice.actions;

export default monthOffsetSlice.reducer;
