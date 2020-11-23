import _ from 'lodash';
import { rootStateTypes } from '@system/store/roots';

const userAddState = (state: rootStateTypes) => state.admin.userControl;

export const username = (state: rootStateTypes) => userAddState(state).username;

export const password = (state: rootStateTypes) => userAddState(state).password;

export const role = (state: rootStateTypes) => userAddState(state).role;

export const permissions = (state: rootStateTypes) => userAddState(state).permissions;

export const email = (state: rootStateTypes) => userAddState(state).email;

export const phone = (state: rootStateTypes) => userAddState(state).phone;

export const position = (state: rootStateTypes) => userAddState(state).position;

export const newUser = (state: rootStateTypes) => _.pick(userAddState(state), [
    'username',
    'password',
    'role',
    'permissions'
]);

export const newContacts = (state: rootStateTypes) => _.pick(userAddState(state), [
    'email',
    'phone',
    'position'
]);

export const validFields = (state: rootStateTypes) => !Object
    .values(newUser(state))
    .every((value) => value.length > 0);
