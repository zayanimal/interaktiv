import { createReducer, getType } from 'typesafe-actions';
import { usersActions } from '@admin/store/actions';
import { IUsersInitialState } from '@admin/interfaces';

const initialState = {
    list: [],
    meta: {
        currentPage: 0,
        itemCount: 0,
        itemsPerPage: 0,
        totalItems: 0,
        totalPages: 0
    },
    userEditMode: false,
    userEditName: ''
};

export const users = createReducer<IUsersInitialState>(initialState, {
    [getType(usersActions.getUsersList.success)]: (state, { payload }) => ({
        ...state,
        list: [...state.list, ...payload.items],
        meta: payload.meta
    }),

    [getType(usersActions.setFiltredUsersList)]: (state, { payload }) => ({
        ...state,
        list: payload
    }),

    [getType(usersActions.setUserEditMode)]: (state, { payload }) => ({
        ...state,
        userEditMode: payload
    }),

    [getType(usersActions.setUserEditName)]: (state, { payload }) => ({
        ...state,
        userEditName: payload
    })
});
