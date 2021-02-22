import { createReducer, getType } from 'typesafe-actions';
import { userControlActions } from '@admin/store/actions';

interface Validation {
    username: string;
    password: string;
    email: string;
    phone: string;
    position: string;
}

interface InitialState {
    loading: boolean;
    username: string;
    password: string;
    role: string;
    isActive: boolean;
    permissions: string[];
    email: string;
    phone: string;
    position: string;
    validation: Partial<Validation>;
}

const initialState = {
    loading: false,
    username: '',
    password: '',
    role: 'customer',
    isActive: true,
    permissions: ['MY_ORDERS', 'NEW_ORDER', 'PERSONAL'],
    email: '',
    phone: '',
    position: '',
    validation: {
        username: '',
        password: '',
        email: '',
        phone: '',
        position: ''
    }
};

export const userControl = createReducer<InitialState>(initialState, {
    [getType(userControlActions.getUser.request)]: (state) => ({
        ...state,
        loading: true
    }),

    [getType(userControlActions.getUser.success)]: (state, { payload }) => ({
        ...state,
        loading: false,
        username: payload.username,
        role: payload.role,
        isActive: payload.isActive,
        permissions: payload.permissions,
        email: payload.contacts.email,
        phone: payload.contacts.phone,
        position: payload.contacts.position
    }),

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

    [getType(userControlActions.setIsActive)]: (state, { payload }) => ({
        ...state,
        isActive: payload
    }),

    [getType(userControlActions.setValidationErrors)]: (
        state,
        { payload }
    ) => ({
        ...state,
        validation: { ...state.validation, ...payload }
    }),

    [getType(userControlActions.clearValidationErrors)]: (state) => ({
        ...state,
        validation: {}
    }),

    [getType(userControlActions.clearUserData)]: () => ({ ...initialState })
});
