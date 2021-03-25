import dateReducer from './chosenDate';
import groupReducer from './chosenGroup';
import { combineReducers } from 'redux';
import addEventPopupReducer from './addEventPopup';
import forceEventsRefreshReducer from './forceEventsRefresh';
import deleteEventPopupReducer from './deleteEventPopup';
import chosenEventReducer from './chosenEvent';
import chosenThemeReducer from './chosenTheme';
import editEventPopupReducer from './editEventPopup';
import eventsReducer from './eventsReducer';
import dayEventsReducer from './dayEventsReducer';

const allReducers = combineReducers({
    events: eventsReducer,
    dayEvents: dayEventsReducer,
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
