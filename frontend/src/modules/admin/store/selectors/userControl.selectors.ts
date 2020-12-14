import _ from 'lodash';
import { RootStateTypes } from '@system/store/roots';

const userAddState = (state: RootStateTypes) => state.admin.userControl;

export const username = (state: RootStateTypes) => userAddState(state).username;

export const password = (state: RootStateTypes) => userAddState(state).password;

export const role = (state: RootStateTypes) => userAddState(state).role;

export const permissions = (state: RootStateTypes) => userAddState(state).permissions;

export const email = (state: RootStateTypes) => userAddState(state).email;

export const phone = (state: RootStateTypes) => userAddState(state).phone;

export const position = (state: RootStateTypes) => userAddState(state).position;

export const newUser = (state: RootStateTypes) => _.pick(userAddState(state), [
    'username',
    'password',
    'role',
    'permissions',
]);

export const newContacts = (state: RootStateTypes) => _.pick(userAddState(state), [
    'email',
    'phone',
    'position',
]);

export const validFields = (state: RootStateTypes) => !Object
    .values(newUser(state))
    .every((value) => value.length > 0);
