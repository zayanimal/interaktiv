import { createAction } from 'typesafe-actions';

export const setUsername = createAction('[ADMIN] USER_ADD_SET_USERNAME')<string>();

export const setPassword = createAction('[ADMIN] USER_ADD_SET_PASSWORD')<string>();

export const setRole = createAction('[ADMIN] USER_ADD_SET_ROLE')<unknown>();

export const setPermissions = createAction('[ADMIN] USER_ADD_SET_PERMISSIONS')<unknown>();

export const clearUserData = createAction('[ADMIN] USER_ADD_CLEAR_USER_DATA')();

export const addNewUser = createAction('[ADMIN] USER_ADD_ADD_NEW_USER')();
