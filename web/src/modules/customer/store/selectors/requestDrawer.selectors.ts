import { rootStateTypes } from '@system/store/roots';
import pick from 'ramda/src/pick';

export const requestDrawerState = (state: rootStateTypes) => state.customer.requestDrawer;

export const openDrawer = (state: rootStateTypes) => requestDrawerState(state).openDrawer;

export const customer = (state: rootStateTypes) => requestDrawerState(state).customer;
export const customerError = (state: rootStateTypes) => requestDrawerState(state).customerError;

export const city = (state: rootStateTypes) => requestDrawerState(state).city;
export const cityError = (state: rootStateTypes) => requestDrawerState(state).cityError;

export const date = (state: rootStateTypes) => requestDrawerState(state).date;

export const comment = (state: rootStateTypes) => requestDrawerState(state).comment;
export const commentError = (state: rootStateTypes) => requestDrawerState(state).commentError;

export const validation = (state: rootStateTypes) => requestDrawerState(state).validation;

export const endUserData = (state: rootStateTypes) => pick([
    'customer',
    'city',
    'date',
    'comment'
], requestDrawerState(state));