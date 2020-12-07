import dateReducer from './chosenDate';
import groupReducer from './chosenGroup';
import chosenEventAdminReducer from "./chosenEventAdmin";
import {combineReducers} from 'redux';
import editModeReducer from './editModeReducer';

const allReducers = combineReducers({
    chosenDate: dateReducer,
    chosenGroup: groupReducer,
    chosenEventAdmin: chosenEventAdminReducer,
    editEnabled: editModeReducer
});

export default allReducers;