import { createAction } from 'typesafe-actions';
import { IUser } from '@system/interfaces/user.interface';
import { IRouterItem } from '@system/interfaces/routerItem.interface';

export const setLogin = createAction('[SYSTEM] SET_LOGIN')<string>();
export const setPassword = createAction('[SYSTEM] SET_PASSWORD')<string>();
export const getCredentials = createAction('[SYSTEM] GET_CREDENTIALS')();
export const setRole = createAction('[SYSTEM] SET_ROLE')<string>();

export const checkAuth = createAction('[SYSTEM] CHECK_AUTH')();
export const setAuth = createAction('[SYSTEM] SET_AUTH')<IUser>();
export const logOut = createAction('[SYSTEM] LOGOUT')();
export const clearUser = createAction('[SYSTEM] CLEAR_USER')();
export const getUsername = createAction('[SYSTEM] GET_USERNAME')();

export const getRouterItems = createAction('[SYSTEM] GET_ROUTER_ITEMS')();
export const setRouterItems = createAction('[SYSTEM] SET_ROUTER_ITEMS')<IRouterItem[]>();

export const getDrawerState = createAction('[SYSTEM] GET_DRAWER_STATE')();
export const setLsDrawerState = createAction('[SYSTEM] SET_LS_DRAWER_STATE')<boolean>();
export const setDrawerState = createAction('[SYSTEM] SET_DRAWER_STATE')<boolean>();
export const setHeaderTitle = createAction('[SYSTEM] SET_HEADER_TITLE')<string>();

export const closeNotification = createAction('[SYSTEM] CLOSE_NOTIFICATION')();
export const successNotification = createAction('[SYSTEM] SUCCESS_NOTIFICATION')<string>();
export const errorNotification = createAction('[SYSTEM] ERROR_NOTIFICATION')<string>();
export const infoNotification = createAction('[SYSTEM] INFO_NOTIFICATION')<string>();
export const warningNotification = createAction('[SYSTEM] WARNING_NOTIFICATION')<string>();
