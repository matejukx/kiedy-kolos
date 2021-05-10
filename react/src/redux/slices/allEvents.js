import { createSlice } from '@reduxjs/toolkit';

export const allEvents = createSlice({
    name: 'allEvents',
    initialState: {
        value: [],
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { set } = allEvents.actions;

export default allEvents.reducer;
