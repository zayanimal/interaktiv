import { combineReducers } from 'redux';
import { users } from '@admin/store/reducers/users.reducer';
import { userControl } from '@admin/store/reducers/userControl.reducer';

export const adminReducer = combineReducers({
    users,
    userControl,
});
