import { createReducer, getType } from 'typesafe-actions';
import { userControlActions } from '@admin/store/actions';

interface InitialState {
    username: string;
    password: string;
    role: string;
    permissions: string[];
    email: string;
    phone: string;
    position: string;
}

const initialState = {
    username: '',
    password: '',
    role: '',
    permissions: [],
    email: '',
    phone: '',
    position: ''
};

export const userControl = createReducer<InitialState>(initialState, {
    [getType(userControlActions.setUsername)]: (state, { payload }) => ({
        ...state,
        username: payload
    }),

    [getType(userControlActions.setPassword)]: (state, { payload }) => ({
        ...state,
        password: payload
    }),

    [getType(userControlActions.setRole)]: (state, { payload }) => ({
        ...state,
        role: payload
    }),

    [getType(userControlActions.setPermissions)]: (state, { payload }) => ({
        ...state,
        permissions: payload
    }),

    [getType(userControlActions.setEmail)]: (state, { payload }) => ({
        ...state,
        email: payload
    }),

    [getType(userControlActions.setPhone)]: (state, { payload }) => ({
        ...state,
        phone: payload
    }),

    [getType(userControlActions.setPosition)]: (state, { payload }) => ({
        ...state,
        position: payload
    }),

    [getType(userControlActions.clearUserData)]: () => ({ ...initialState })
});
