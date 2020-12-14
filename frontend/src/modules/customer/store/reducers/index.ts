import { combineReducers } from 'redux';
import { request } from './request.reducer';
import { requestDrawer } from './requestDrawer.reducer';
import { requestsList } from './requestsList.reducer';

export const customerReducer = combineReducers({
    request,
    requestDrawer,
    requestsList,
});
