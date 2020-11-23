import { createAction } from 'typesafe-actions';

export const setUsername = createAction('[ADMIN] USER_ADD_SET_USERNAME')<string>();

export const setPassword = createAction('[ADMIN] USER_ADD_SET_PASSWORD')<string>();

export const setRole = createAction('[ADMIN] USER_ADD_SET_ROLE')<unknown>();

export const setPermissions = createAction('[ADMIN] USER_ADD_SET_PERMISSIONS')<unknown>();

export const setEmail = createAction('[ADMIN] USER_ADD_SET_EMAIL')<string>();

export const setPhone = createAction('[ADMIN] USER_ADD_SET_PHONE')<string>();

export const setPosition = createAction('[ADMIN] USER_ADD_SET_POSITION')<string>();

export const clearUserData = createAction('[ADMIN] USER_ADD_CLEAR_USER_DATA')();

export const addNewUser = createAction('[ADMIN] USER_ADD_ADD_NEW_USER')();
