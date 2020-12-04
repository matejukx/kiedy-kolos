import dateReducer from './chosenDate';
import groupReducer from './chosenGroup';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    chosenDate: dateReducer,
    chosenGroup: groupReducer
});

export default allReducers;