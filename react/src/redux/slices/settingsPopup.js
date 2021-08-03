import { createSlice } from '@reduxjs/toolkit';

export const settingsPopupSlice = createSlice({
  name: 'settingsPopup',
  initialState: {
    value: false,
  },
  reducers: {
    setSettingsPopup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSettingsPopup: setSettingsPopup } = settingsPopupSlice.actions;

export default settingsPopupSlice.reducer;
