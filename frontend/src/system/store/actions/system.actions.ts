import { createAction } from 'typesafe-actions';

export const setLogin = createAction('[system] SET_LOGIN')<string>();
export const setPassword = createAction('[system] SET_PASSWORD')<string>();
export const getCredentials = createAction('[system] GET_CREDENTIALS')();
export const setUser = createAction('[system] SET_USER')<any>();

export const setDrawerState = createAction('[SYSTEM] SET_DRAWER_STATE')<boolean>();
export const setHeaderTitle = createAction('[SYSTEM] SET_HEADER_TITLE')<string>();

export const closeNotification = createAction('[SYSTEM] SET_OPEN_NOTIFICATION')();
export const successNotification = createAction('[SYSTEM] SUCCESS_NOTIFICATION')<string>();
export const errorNotification = createAction('[SYSTEM] ERROR_NOTIFICATION')<string>();
export const infoNotification = createAction('[SYSTEM] INFO_NOTIFICATION')<string>();
export const warningNotification = createAction('[SYSTEM] WARNING_NOTIFICATION')<string>();
