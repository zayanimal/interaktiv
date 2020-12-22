import { createReducer, getType } from 'typesafe-actions';
import { companyControlActions } from '@admin/store/actions';

const initialState = {
    loading: false,
    id: '',
    name: '',
    users: [''],
    contact: { phone: '', email: '', website: '' },
    requisites: [''],
    entities: {},
};

export const companyControl = createReducer<typeof initialState>(initialState, {
    [getType(companyControlActions.getCompany.request)]: (state) => ({ ...state, loading: true }),

    [getType(companyControlActions.getCompany.success)]: (state, { payload }) => ({
        ...state,
        loading: false,
        ...payload.result,
        entities: {
            ...state.entities,
            ...payload.entities,
        }
    }),
});
