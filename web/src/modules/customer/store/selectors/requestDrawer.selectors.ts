import { rootStateTypes } from '@system/store/roots';

export const requestDrawerState = (state: rootStateTypes) => state.customer.requestDrawer;

export const openDrawer = (state: rootStateTypes) => requestDrawerState(state).openDrawer;

export const customer = (state: rootStateTypes) => requestDrawerState(state).customer;

export const city = (state: rootStateTypes) => requestDrawerState(state).city;

export const date = (state: rootStateTypes) => requestDrawerState(state).date;

export const comment = (state: rootStateTypes) => requestDrawerState(state).comment;

export const validation = (state: rootStateTypes) => requestDrawerState(state).validation;
