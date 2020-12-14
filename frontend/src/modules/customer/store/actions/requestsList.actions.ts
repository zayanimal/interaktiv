import {
    // createAction,
    createAsyncAction,
} from 'typesafe-actions';

export const getRequestsList = createAsyncAction(
    '[CUSTOMER] REQUESTS_LIST_GET_REQUEST',
    '[CUSTOMER] REQUESTS_LIST_GET_SUCCESS',
    '[CUSTOMER] REQUESTS_LIST_GET_FAILURE',
)<undefined, unknown, unknown>();
