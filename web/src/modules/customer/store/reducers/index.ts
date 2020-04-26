import { combineReducers } from 'redux';
import { requestReducer } from './request.reducer';


export const customerReducer = combineReducers({
    request: requestReducer
});
