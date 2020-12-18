import { createAction, createAsyncAction } from 'typesafe-actions';

export const getUser = createAsyncAction(
    '[ADMIN] GET_USER_REQUEST',
    '[ADMIN] GET_USER_SUCCESS',
    '[ADMIN] GET_USER_FAILURE',
)<string, unknown, unknown>();

export const editUser = createAsyncAction(
    '[ADMIN] EDIT_USER_REQUEST',
    '[ADMIN] EDIT_USER_SUCCESS',
    '[ADMIN] EDIT_USER_FAILURE',
)<string, any, any>();

export const setUsername = createAction('[ADMIN] USER_ADD_SET_USERNAME')<string>();

export const setPassword = createAction('[ADMIN] USER_ADD_SET_PASSWORD')<string>();

export const setRole = createAction('[ADMIN] USER_ADD_SET_ROLE')<unknown>();

export const setPermissions = createAction('[ADMIN] USER_ADD_SET_PERMISSIONS')<unknown>();

export const setEmail = createAction('[ADMIN] USER_ADD_SET_EMAIL')<string>();

export const setPhone = createAction('[ADMIN] USER_ADD_SET_PHONE')<string>();

export const setPosition = createAction('[ADMIN] USER_ADD_SET_POSITION')<string>();

export const setIsActive = createAction('[ADMIN] USER_ADD_SET_IS_ACTIVE')<boolean>();

export const clearUserData = createAction('[ADMIN] USER_ADD_CLEAR_USER_DATA')();

export const addNewUser = createAction('[ADMIN] USER_ADD_ADD_NEW_USER')();

export const setValidationErrors = createAction('[ADMIN] SET_VALIDATION_ERRORS')<object>();

export const clearValidationErrors = createAction('[ADMIN] CLEAR_VALIDATION_ERRORS')();
