import { createReducer, getType } from 'typesafe-actions';
import { searchUserActions } from '@admin/store/actions';

const initialState = {
    found: [] as string[],
    selected: [] as string[],
};

export const searchUser = createReducer<typeof initialState>(initialState, {
    [getType(searchUserActions.setFound)]: (state, { payload }) => ({
        ...state,
        found: payload
    }),
});
