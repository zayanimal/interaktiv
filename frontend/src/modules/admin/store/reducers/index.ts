import { combineReducers } from 'redux';
import { users } from '@admin/store/reducers/users.reducer';

export const adminReducer = combineReducers({
    users
});
