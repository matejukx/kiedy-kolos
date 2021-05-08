import { configureStore } from '@reduxjs/toolkit';

import monthOffsetReducer from './slices/monthOffsetSlice';
import chosenDateReducer from './slices/chosenDateSlice';

export default configureStore({
    reducer: {
        monthOffset: monthOffsetReducer,
        chosenDate: chosenDateReducer,
    },
});
