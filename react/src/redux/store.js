import { configureStore } from '@reduxjs/toolkit';

import monthOffsetReducer from './slices/monthOffsetSlice';

export default configureStore({
    reducer: {
        monthOffset: monthOffsetReducer,
    },
});
