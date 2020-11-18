import { combineReducers } from 'redux';
import { users } from '@admin/store/reducers/users.reducer';
import { userAdd } from '@admin/store/reducers/userAdd.reducer';

export const adminReducer = combineReducers({
    users,
    userAdd
});
