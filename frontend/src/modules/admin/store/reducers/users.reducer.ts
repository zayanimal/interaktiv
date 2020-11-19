import { createReducer, getType } from 'typesafe-actions';
import { usersActions } from '@admin/store/actions';
import { IUser, IUsersMeta } from '@admin/interfaces/users.interface';

interface InitialState {
    list: IUser[],
    meta: IUsersMeta;
}

const initialState = {
    list: [],
    meta: {
        currentPage: 0,
        itemCount: 0,
        itemsPerPage: 0,
        totalItems: 0,
        totalPages: 0
    }
};

export const users = createReducer<InitialState>(initialState, {
    [getType(usersActions.getUsersList.success)]: (state, { payload }) => ({
        ...state,
        list: [...state.list, ...payload.items],
        meta: payload.meta
    }),

    [getType(usersActions.setFiltredUsersList)]: (state, { payload }) => ({
        ...state,
        list: payload
    })
});
