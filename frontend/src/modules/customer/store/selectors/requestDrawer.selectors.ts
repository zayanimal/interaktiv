import { RootStateTypes } from '@config/roots';
import { pick } from 'lodash';

export const requestDrawerState = (state: RootStateTypes) =>
    state.customer.requestDrawer;

export const openDrawer = (state: RootStateTypes) =>
    requestDrawerState(state).openDrawer;

export const customer = (state: RootStateTypes) =>
    requestDrawerState(state).customer;
export const customerError = (state: RootStateTypes) =>
    requestDrawerState(state).customerError;

export const city = (state: RootStateTypes) => requestDrawerState(state).city;
export const cityError = (state: RootStateTypes) =>
    requestDrawerState(state).cityError;

export const date = (state: RootStateTypes) => requestDrawerState(state).date;

export const comment = (state: RootStateTypes) =>
    requestDrawerState(state).comment;
export const commentError = (state: RootStateTypes) =>
    requestDrawerState(state).commentError;

export const validation = (state: RootStateTypes) =>
    requestDrawerState(state).validation;

export const endUserData = (state: RootStateTypes) =>
    pick(requestDrawerState(state), ['customer', 'city', 'date', 'comment']);
