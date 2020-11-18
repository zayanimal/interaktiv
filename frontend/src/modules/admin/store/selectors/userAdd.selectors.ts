import _ from 'lodash';
import { rootStateTypes } from '@system/store/roots';

const userAddState = (state: rootStateTypes) => state.admin.userAdd;

export const username = (state: rootStateTypes) => userAddState(state).username;

export const password = (state: rootStateTypes) => userAddState(state).password;

export const role = (state: rootStateTypes) => userAddState(state).role;

export const permissions = (state: rootStateTypes) => userAddState(state).permissions;

export const newUser = (state: rootStateTypes) => _.pick(userAddState(state), [
    'username',
    'password',
    'role',
    'permissions'
]);

export const validFields = (state: rootStateTypes) => !Object
    .values(newUser(state))
    .every((value) => value.length > 0);
