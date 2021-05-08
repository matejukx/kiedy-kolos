import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

export const chosenDateSlice = createSlice({
    name: 'chosenDate',
    initialState: {
        value: dayjs().format('YYYY-MM-DD'),
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { set } = chosenDateSlice.actions;

export default chosenDateSlice.reducer;
