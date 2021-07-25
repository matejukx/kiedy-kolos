import { configureStore } from '@reduxjs/toolkit';

import monthOffsetReducer from './slices/monthOffsetSlice';
import chosenDateReducer from './slices/chosenDateSlice';
import dailyEventsReducer from './slices/dailyEvents';
import choosenGroupReducer from './slices/chosenGroupSlice';
import allEventsReducer from './slices/allEvents';
import addEventPopupReducer from './slices/addEventPopup';
import editEventPopupReducer from './slices/editEventPopup';
import removeEventPopupReducer from './slices/removeEventPopup';
import subjectsReducer from './slices/subjects';
import groupsReducer from './slices/groups';
import typesReducer from './slices/types';
import forceEventsRefreshReducer from './slices/forceEventsRefresh';
import chosenEventReducer from './slices/chosenEvent';

export default configureStore({
  reducer: {
    monthOffset: monthOffsetReducer,
    chosenDate: chosenDateReducer,
    choosenGroup: choosenGroupReducer,
    dailyEvents: dailyEventsReducer,
    allEvents: allEventsReducer,

    addEventPopup: addEventPopupReducer,
    removeEventPopup: removeEventPopupReducer,
    editEventPopup: editEventPopupReducer,

    subjects: subjectsReducer,
    groups: groupsReducer,
    types: typesReducer,
    forceEventsRefresh: forceEventsRefreshReducer,
    chosenEvent: chosenEventReducer,
  },
});
