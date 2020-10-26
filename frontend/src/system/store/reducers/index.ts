import { combineReducers } from 'redux';
import { systemReducer } from './system.reducer';


export const customerReducer = combineReducers({
    system: systemReducer
});
