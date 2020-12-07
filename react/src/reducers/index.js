import dateReducer from './chosenDate';
import groupReducer from './chosenGroup';
import chosenEventAdminReducer from "./chosenEventAdmin";
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    chosenDate: dateReducer,
    chosenGroup: groupReducer,
    chosenEventAdmin: chosenEventAdminReducer
});

export default allReducers;