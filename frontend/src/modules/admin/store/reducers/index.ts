import { combineReducers } from 'redux';
import { users } from '@admin/store/reducers/users.reducer';
import { userControl } from '@admin/store/reducers/user-control.reducer';

export const adminReducer = combineReducers({
    users,
    userControl,
});
