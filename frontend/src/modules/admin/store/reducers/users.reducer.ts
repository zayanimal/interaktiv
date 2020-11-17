import { createReducer, getType } from 'typesafe-actions';
import { usersActions } from '@admin/store/actions';
import { IUser } from '@admin/interfaces/users.interface';

interface InitialState {
    list: IUser[]
}

const initialState = {
    list: []
};

export const users = createReducer<InitialState>(initialState, {
    [getType(usersActions.getUsersList.success)]: (state, { payload }) => ({
        ...state,
        list: payload.items
    })
});
