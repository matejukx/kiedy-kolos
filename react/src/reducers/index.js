import dateReducer from './chosenDate';
import groupReducer from './chosenGroup';
import chosenEventAdminReducer from './chosenEventAdmin';
import { combineReducers } from 'redux';
import editModeReducer from './editModeReducer';
import addEventPopupReducer from './addEventPopup';

const allReducers = combineReducers({
    chosenDate: dateReducer,
    chosenGroup: groupReducer,
    chosenEventAdmin: chosenEventAdminReducer,
    editEnabled: editModeReducer,
    addEventPopup: addEventPopupReducer,
});

export default allReducers;
