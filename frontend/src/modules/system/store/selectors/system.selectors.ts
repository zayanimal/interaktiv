import _ from 'lodash';
import { RootStateTypes } from '@config/roots';

export const systemState = (state: RootStateTypes) => state.system.system;

export const drawer = (state: RootStateTypes) => systemState(state).drawer;

export const routerItems = (state: RootStateTypes) =>
    systemState(state).routerItems;

export const headerTitle = (state: RootStateTypes) =>
    systemState(state).headerTitle;

export const openNotification = (state: RootStateTypes) =>
    systemState(state).openNotification;

export const typeNotification = (state: RootStateTypes) =>
    systemState(state).typeNotification;

export const messageNotification = (state: RootStateTypes) =>
    systemState(state).messageNotification;

export const username = (state: RootStateTypes) => systemState(state).username;

export const password = (state: RootStateTypes) => systemState(state).password;

export const role = (state: RootStateTypes) => systemState(state).role;

export const credentials = (state: RootStateTypes) =>
    _.pick(systemState(state), ['username', 'password']);

export const authFetched = (state: RootStateTypes) =>
    systemState(state).authFetched;

export const isLoggedIn = (state: RootStateTypes) =>
    systemState(state).isLoggedIn;

export const permissions = (state: RootStateTypes) =>
    systemState(state).permissions;
