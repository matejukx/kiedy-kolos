import { createSlice } from '@reduxjs/toolkit';

export const addEventPopupSlice = createSlice({
  name: 'addEventPopup',
  initialState: {
    value: false,
  },
  reducers: {
    setAddEventPopup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAddEventPopup: setAddEventPopup } = addEventPopupSlice.actions;

export default addEventPopupSlice.reducer;
