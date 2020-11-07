import { createAction } from 'typesafe-actions';

export const setLogin = createAction('[SYSTEM] SET_LOGIN')<string>();
export const setPassword = createAction('[SYSTEM] SET_PASSWORD')<string>();
export const getCredentials = createAction('[SYSTEM] GET_CREDENTIALS')();
export const setRole = createAction('[SYSTEM] SET_ROLE')<string>();

export const checkAuth = createAction('[SYSTEM] CHECK_LOGGED')();
export const setAuth = createAction('[SYSTEM] SET_AUTH')<boolean>();
export const logOut = createAction('[SYSTEM] LOGOUT')();
export const clearUser = createAction('[SYSTEM] CLEAR_USER')();
export const getUsername = createAction('[SYSTEM] GET_USERNAME')();

export const setDrawerState = createAction('[SYSTEM] SET_DRAWER_STATE')<boolean>();
export const setHeaderTitle = createAction('[SYSTEM] SET_HEADER_TITLE')<string>();

export const closeNotification = createAction('[SYSTEM] SET_OPEN_NOTIFICATION')();
export const successNotification = createAction('[SYSTEM] SUCCESS_NOTIFICATION')<string>();
export const errorNotification = createAction('[SYSTEM] ERROR_NOTIFICATION')<string>();
export const infoNotification = createAction('[SYSTEM] INFO_NOTIFICATION')<string>();
export const warningNotification = createAction('[SYSTEM] WARNING_NOTIFICATION')<string>();
