import { createSlice } from '@reduxjs/toolkit';

export const removeGroupPopupSlice = createSlice({
  name: 'removeGroupPopup',
  initialState: {
    value: false,
  },
  reducers: {
    setRemoveGroupPopup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setRemoveGroupPopup: setRemoveGroupPopup } = removeGroupPopupSlice.actions;

export default removeGroupPopupSlice.reducer;
