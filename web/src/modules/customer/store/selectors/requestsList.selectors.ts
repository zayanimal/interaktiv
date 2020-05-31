import { rootStateTypes } from '@system/store/roots';

export const requestsListState = (state: rootStateTypes) => state.customer.requestsList;
export const requests = (state: rootStateTypes) => requestsListState(state).requests;
