import { rootStateTypes } from '@system/store/roots';

export const requestDrawerState = (state: rootStateTypes) => state.customer.requestDrawer;

export const openDrawer = (state: rootStateTypes) => requestDrawerState(state).openDrawer;
