import { createSlice } from '@reduxjs/toolkit';

export const removeEventPopupSlice = createSlice({
  name: 'removeEventPopup',
  initialState: {
    value: false,
  },
  reducers: {
    setRemoveEventPopup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setRemoveEventPopup: setRemoveEventPopup } = removeEventPopupSlice.actions;

export default removeEventPopupSlice.reducer;
