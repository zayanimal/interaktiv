import { rootStateTypes } from '@system/store/roots';

export const systemState = (state: rootStateTypes) => state.system;

export const drawer = (state: rootStateTypes) => systemState(state).drawer;

export const headerTitle = (state: rootStateTypes) => systemState(state).headerTitle;

export const openNotification = (state: rootStateTypes) => systemState(state).openNotification;

export const typeNotification = (state: rootStateTypes) => systemState(state).typeNotification;

export const messageNotification = (state: rootStateTypes) => systemState(state).messageNotification;
