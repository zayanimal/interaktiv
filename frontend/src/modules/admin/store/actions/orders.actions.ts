import { createAsyncAction } from 'typesafe-actions';

export const getOrdersList = createAsyncAction(
    '[ADMIN] GET_ORDERS_REQUEST',
    '[ADMIN] GET_ORDERS_SUCCESS',
    '[ADMIN] GET_ORDERS_FAILURE'
)<number, unknown, undefined>();
