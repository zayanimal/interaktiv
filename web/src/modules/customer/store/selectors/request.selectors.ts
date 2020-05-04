import { rootStateTypes } from '@system/store/roots';

export const requestState = (state: rootStateTypes) => state.customer.request;

export const rate = (state: rootStateTypes) => requestState(state).rate;

export const modelsData = (state: rootStateTypes) => requestState(state).modelsData;

export const modelsDataInOrder = (state: rootStateTypes) => requestState(state).modelsDataInOrder;

export const modelsSelected = (state: rootStateTypes) => requestState(state).modelsSelected;

export const listState = (state: rootStateTypes) => requestState(state).showList;
