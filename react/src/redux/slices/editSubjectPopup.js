import { createSlice } from '@reduxjs/toolkit';

export const editSubjectPopupSlice = createSlice({
  name: 'editSubjectPopup',
  initialState: {
    value: false,
  },
  reducers: {
    setEditSubjectPopup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setEditSubjectPopup: setEditSubjectPopup } = editSubjectPopupSlice.actions;

export default editSubjectPopupSlice.reducer;
