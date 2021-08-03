import { createSlice } from '@reduxjs/toolkit';

export const editGroupPopupSlice = createSlice({
  name: 'editGroupPopup',
  initialState: {
    value: false,
  },
  reducers: {
    setEditGroupPopup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setEditGroupPopup: setEditGroupPopup } = editGroupPopupSlice.actions;

export default editGroupPopupSlice.reducer;
