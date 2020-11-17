import { createAsyncAction } from 'typesafe-actions';

export const getUsersList = createAsyncAction(
    '[ADMIN] GET_USERS_REQUEST',
    '[ADMIN] GET_USERS_SUCCESS',
    '[ADMIN] GET_USERS_FAILURE',
)<number, unknown, undefined>();
