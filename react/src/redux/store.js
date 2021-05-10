import { configureStore } from '@reduxjs/toolkit';

import monthOffsetReducer from './slices/monthOffsetSlice';
import chosenDateReducer from './slices/chosenDateSlice';
import dailyEventsReducer from './slices/dailyEvents';
import choosenGroupReducer from './slices/chosenGroupSlice';
import allEventsReducer from './slices/allEvents';

export default configureStore({
    reducer: {
        monthOffset: monthOffsetReducer,
        chosenDate: chosenDateReducer,
        choosenGroup: choosenGroupReducer,
        dailyEvents: dailyEventsReducer,
        allEvents: allEventsReducer,
    },
});
