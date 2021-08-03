import { createSlice } from '@reduxjs/toolkit';

export const addGroupPopupSlice = createSlice({
  name: 'addGroupPopup',
  initialState: {
    value: false,
  },
  reducers: {
    setAddGroupPopup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAddGroupPopup: setAddGroupPopup } = addGroupPopupSlice.actions;

export default addGroupPopupSlice.reducer;
