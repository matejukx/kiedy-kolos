import dateReducer from './chosenDate';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    chosenDate: dateReducer
});

export default allReducers;