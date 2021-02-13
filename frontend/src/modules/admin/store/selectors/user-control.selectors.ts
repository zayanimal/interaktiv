import { pick } from 'lodash';
import { RootStateTypes } from '@config/roots';

const userControlState = (state: RootStateTypes) => state.admin.userControl;

export const loading = (state: RootStateTypes) =>
    userControlState(state).loading;

export const username = (state: RootStateTypes) =>
    userControlState(state).username;

export const password = (state: RootStateTypes) =>
    userControlState(state).password;

export const role = (state: RootStateTypes) => userControlState(state).role;

export const permissions = (state: RootStateTypes) =>
    userControlState(state).permissions;

export const email = (state: RootStateTypes) => userControlState(state).email;

export const phone = (state: RootStateTypes) => userControlState(state).phone;

export const position = (state: RootStateTypes) =>
    userControlState(state).position;

export const isActive = (state: RootStateTypes) =>
    userControlState(state).isActive;

export const newUser = (state: RootStateTypes) =>
    pick(userControlState(state), [
        'username',
        'password',
        'role',
        'permissions',
        'isActive'
    ]);

export const newContacts = (state: RootStateTypes) =>
    pick(userControlState(state), ['email', 'phone', 'position']);

export const validation = (state: RootStateTypes) =>
    userControlState(state).validation;
