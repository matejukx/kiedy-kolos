import dateReducer from './chosenDate';
import groupReducer from './chosenGroup';
import { combineReducers } from 'redux';
import addEventPopupReducer from './addEventPopup';
import forceEventsRefreshReducer from './forceEventsRefresh';
import deleteEventPopupReducer from './deleteEventPopup';
import chosenEventReducer from './chosenEvent';
import chosenThemeReducer from './chosenTheme';
import editEventPopupReducer from './editEventPopup';
import allEventsReducer from './allEventsReducer';
import dayEventsReducer from './dayEventsReducer';
import eventTypesReducer from './eventTypesReducer';
import subjectsReducer from './subjectsReducer';

const allReducers = combineReducers({
    allEvents: allEventsReducer,
    dayEvents: dayEventsReducer,
    eventTypes: eventTypesReducer,
    subjects: subjectsReducer,
    chosenDate: dateReducer,
    chosenGroup: groupReducer,
    addEventPopup: addEventPopupReducer,
    deleteEventPopup: deleteEventPopupReducer,
    editEventPopup: editEventPopupReducer,
    forceEventsRefresh: forceEventsRefreshReducer,
    chosenEvent: chosenEventReducer,
    chosenTheme: chosenThemeReducer,
});

export default allReducers;
