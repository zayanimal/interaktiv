import { createReducer, getType } from 'typesafe-actions';
import { companyControlActions } from '@admin/store/actions';

interface IInitialState {
    loading: boolean;
    id: string;
    name: string
    users: string[];
    email: string;
    phone: string;
    website: string;
    errorName: string
    errorUsers: string[];
    errorEmail: string;
    errorPhone: string;
    errorWebsite: string;
}

const initialState = {
    loading: false,
    id: '',
    name: '',
    users: [],
    email: '',
    phone: '',
    website: '',
    errorName: '',
    errorUsers: [],
    errorEmail: '',
    errorPhone: '',
    errorWebsite: '',
};

export const companyControl = createReducer<IInitialState>(initialState, {
    [getType(companyControlActions.getCompany.request)]: (state) => ({ ...state, loading: true }),

    [getType(companyControlActions.getCompany.success)]: (state, { payload }) => ({
        ...state,
        loading: false,
        id: payload.id,
        name: payload.name,
        users: payload.users,
        email: payload.contact.email,
        phone: payload.contact.phone,
        website: payload.contact.website,
    }),
});
