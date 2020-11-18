import { createReducer, getType } from 'typesafe-actions';
import { userAddActions } from '@admin/store/actions';

interface InitialState {
    username: string;
    password: string;
    role: string;
    permissions: string[];
}

const initialState = {
    username: '',
    password: '',
    role: '',
    permissions: []
};

export const userAdd = createReducer<InitialState>(initialState, {
    [getType(userAddActions.setUsername)]: (state, { payload }) => ({
        ...state,
        username: payload
    }),

    [getType(userAddActions.setPassword)]: (state, { payload }) => ({
        ...state,
        password: payload
    }),

    [getType(userAddActions.setRole)]: (state, { payload }) => ({
        ...state,
        role: payload
    }),

    [getType(userAddActions.setPermissions)]: (state, { payload }) => ({
        ...state,
        permissions: payload
    }),

    [getType(userAddActions.clearUserData)]: () => ({ ...initialState })
});
