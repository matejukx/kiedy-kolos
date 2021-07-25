import { createSlice } from '@reduxjs/toolkit';

export const editEventPopupSlice = createSlice({
  name: 'editEventPopup',
  initialState: {
    value: false,
  },
  reducers: {
    setEditEventPopup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setEditEventPopup: setEditEventPopup } = editEventPopupSlice.actions;

export default editEventPopupSlice.reducer;
