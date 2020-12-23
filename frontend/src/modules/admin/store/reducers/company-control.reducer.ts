import { createReducer, getType } from 'typesafe-actions';
import { companyControlActions } from '@admin/store/actions';
import { RequisitesEntity, BankRequisitesEntity } from '@admin/entities';
import { NormalisedEntity } from '@utils/generics';

const initialState = {
    drawer: false,
    loading: false,
    id: '',
    currentRequisitesId: '',
    name: '',
    users: [''],
    contact: { phone: '', email: '', website: '' },
    requisites: [''],
    entities: {
        requisites: {} as NormalisedEntity<RequisitesEntity>,
        bank: {} as NormalisedEntity<BankRequisitesEntity>,
    },
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

    [getType(companyControlActions.setCompanyForm)]: (state, { payload }) => ({ ...state, ...payload }),

    [getType(companyControlActions.setContactForm)]: (state, { payload }) => ({
        ...state,
        contact: { ...state.contact, ...payload },
    }),

    [getType(companyControlActions.setDrawerState)]: (state, { payload }) => ({
        ...state,
        drawer: payload,
    }),

    [getType(companyControlActions.setCurrentRequisites)]: (state, { payload }) => ({
        ...state,
        currentRequisitesId: payload,
    }),

    [getType(companyControlActions.setRequsitesForm)]: (state, { payload }) => ({
        ...state,
        entities: {
            ...state.entities,
            requisites: {
                ...state.entities.requisites,
                [state.currentRequisitesId]: {
                    ...state.entities.requisites[state.currentRequisitesId],
                    ...payload,
                },
            },
        },
    }),
});
