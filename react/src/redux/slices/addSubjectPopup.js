import { createSlice } from '@reduxjs/toolkit';

export const addSubjectPopupSlice = createSlice({
  name: 'addSubjectPopup',
  initialState: {
    value: false,
  },
  reducers: {
    setAddSubjectPopup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAddSubjectPopup: setAddSubjectPopup } = addSubjectPopupSlice.actions;

export default addSubjectPopupSlice.reducer;
