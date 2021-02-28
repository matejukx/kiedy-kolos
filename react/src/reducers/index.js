import dateReducer from './chosenDate';
import groupReducer from './chosenGroup';
import chosenEventAdminReducer from './chosenEventAdmin';
import { combineReducers } from 'redux';
import editModeReducer from './editModeReducer';
import addEventPopupReducer from './addEventPopup';
import forceEventsRefreshReducer from './forceEventsRefresh';
import deleteEventPopupReducer from './deleteEventPopup';
import chosenEventReducer from './chosenEvent';

const allReducers = combineReducers({
    chosenDate: dateReducer,
    chosenGroup: groupReducer,
    chosenEventAdmin: chosenEventAdminReducer,
    editEnabled: editModeReducer,
    addEventPopup: addEventPopupReducer,
    deleteEventPopup: deleteEventPopupReducer,
    forceEventsRefresh: forceEventsRefreshReducer,
    chosenEvent: chosenEventReducer,
});

export default allReducers;
