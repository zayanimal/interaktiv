import _ from 'lodash';
import { rootStateTypes } from '@system/store/roots';

export const systemState = (state: rootStateTypes) => state.system;

export const drawer = (state: rootStateTypes) => systemState(state).drawer;

export const routerItems = (state: rootStateTypes) => systemState(state).routerItems;

export const headerTitle = (state: rootStateTypes) => systemState(state).headerTitle;

export const openNotification = (state: rootStateTypes) => systemState(state).openNotification;

export const typeNotification = (state: rootStateTypes) => systemState(state).typeNotification;

export const messageNotification = (state: rootStateTypes) => systemState(state)
    .messageNotification;

export const username = (state: rootStateTypes) => systemState(state).username;

export const password = (state: rootStateTypes) => systemState(state).password;

export const credentials = (state: rootStateTypes) => _.pick(systemState(state), ['username', 'password']);

export const authFetched = (state: rootStateTypes) => systemState(state).authFetched;

export const isLoggedIn = (state: rootStateTypes) => systemState(state).isLoggedIn;

export const permissions = (state: rootStateTypes) => systemState(state).permissions;
