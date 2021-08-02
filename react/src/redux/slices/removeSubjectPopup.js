import { createSlice } from '@reduxjs/toolkit';

export const removeSubjectPopupSlice = createSlice({
  name: 'removeSubjectPopup',
  initialState: {
    value: false,
  },
  reducers: {
    setRemoveSubjectPopup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setRemoveSubjectPopup: setRemoveSubjectPopup } = removeSubjectPopupSlice.actions;

export default removeSubjectPopupSlice.reducer;
