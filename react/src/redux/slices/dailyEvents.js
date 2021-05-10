import { createSlice } from '@reduxjs/toolkit';

export const dailyEventsSlice = createSlice({
    name: 'dailyEvents',
    initialState: {
        value: [],
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { set } = dailyEventsSlice.actions;

export default dailyEventsSlice.reducer;
