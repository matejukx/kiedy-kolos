import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

export const monthOffsetSlice = createSlice({
    name: 'monthOffset',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        set: (state, action) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, set } = monthOffsetSlice.actions;

export default monthOffsetSlice.reducer;
