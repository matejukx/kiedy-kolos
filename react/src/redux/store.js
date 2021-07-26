import { configureStore } from '@reduxjs/toolkit';

import monthOffsetReducer from './slices/monthOffsetSlice';
import chosenDateReducer from './slices/chosenDateSlice';
import dailyEventsReducer from './slices/dailyEvents';
import chosenGroupIDReducer from './slices/chosenGroupIDSlice';
import allEventsReducer from './slices/allEvents';
import addEventPopupReducer from './slices/addEventPopup';
import editEventPopupReducer from './slices/editEventPopup';
import settingsPopupReducer from './slices/settingsPopup';
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
    chosenGroupID: chosenGroupIDReducer,
    dailyEvents: dailyEventsReducer,
    allEvents: allEventsReducer,

    addEventPopup: addEventPopupReducer,
    removeEventPopup: removeEventPopupReducer,
    editEventPopup: editEventPopupReducer,
    settingsPopup: settingsPopupReducer,

    subjects: subjectsReducer,
    groups: groupsReducer,
    types: typesReducer,
    forceEventsRefresh: forceEventsRefreshReducer,
    chosenEvent: chosenEventReducer,
  },
});
