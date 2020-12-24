import { createReducer, getType } from 'typesafe-actions';
import { companyControlActions } from '@admin/store/actions';
import { RequisitesEntity, BankRequisitesEntity } from '@admin/entities';
import { Normalised } from '@utils/generics';

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
        requisites: {} as Normalised<RequisitesEntity>,
        bank: {} as Normalised<BankRequisitesEntity>,
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
                [payload.id]: {
                    ...(state.entities.requisites[payload.id] || {}),
                    ...payload,
                },
            },
        },
    }),

    [getType(companyControlActions.setBankForm)]: (state, { payload }) => ({
        ...state,
        entities: {
            ...state.entities,
            bank: {
                ...state.entities.bank,
                [payload.id]: {
                    ...(state.entities.bank[payload.id] || {}),
                    ...payload,
                }
            }
        }
    }),

    [getType(companyControlActions.deleteBankForm)]: (state, { payload }) => ({
        ...state,
        entities: {
            ...state.entities,
            requisites: {
                ...state.entities.requisites,
                [state.currentRequisitesId]: {
                    ...(state.entities.requisites[state.currentRequisitesId] || {}),
                    bank: state.entities.requisites[state.currentRequisitesId].bank.filter(
                        (id) => id !== payload
                    )
                },
            },
        },
    })
});
