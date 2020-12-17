import { createReducer, getType } from 'typesafe-actions';
import { userControlActions } from '@admin/store/actions';

interface IInitialState {
    loading: boolean;
    username: string;
    password: string;
    role: string;
    isActive: boolean;
    permissions: string[];
    email: string;
    phone: string;
    position: string;
    errorUsername: string;
    errorPassword: string;
    errorEmail: string;
    errorPhone: string;
    errorPosition: string;
}

const initialState = {
    loading: false,
    username: '',
    password: '',
    role: '',
    isActive: true,
    permissions: [],
    email: '',
    phone: '',
    position: '',
    errorUsername: '',
    errorPassword: '',
    errorEmail: '',
    errorPhone: '',
    errorPosition: ''
};

export const userControl = createReducer<IInitialState>(initialState, {
    [getType(userControlActions.getUser.request)]: (state) => ({ ...state, loading: true }),

    [getType(userControlActions.getUser.success)]: (state, { payload }) => ({
        ...state,
        loading: false,
        username: payload.username,
        role: payload.role,
        isActive: payload.isActive,
        permissions: payload.permissions,
        email: payload.contacts.email,
        phone: payload.contacts.phone,
        position: payload.contacts.position,
    }),

    [getType(userControlActions.setUsername)]: (state, { payload }) => ({
        ...state,
        username: payload,
    }),

    [getType(userControlActions.setPassword)]: (state, { payload }) => ({
        ...state,
        password: payload,
    }),

    [getType(userControlActions.setRole)]: (state, { payload }) => ({
        ...state,
        role: payload,
    }),

    [getType(userControlActions.setPermissions)]: (state, { payload }) => ({
        ...state,
        permissions: payload,
    }),

    [getType(userControlActions.setEmail)]: (state, { payload }) => ({
        ...state,
        email: payload,
    }),

    [getType(userControlActions.setPhone)]: (state, { payload }) => ({
        ...state,
        phone: payload,
    }),

    [getType(userControlActions.setPosition)]: (state, { payload }) => ({
        ...state,
        position: payload,
    }),

    [getType(userControlActions.setValidationErrors)]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),

    [getType(userControlActions.clearUserData)]: () => ({ ...initialState }),
});
