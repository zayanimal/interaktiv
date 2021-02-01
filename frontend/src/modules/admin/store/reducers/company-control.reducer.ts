import { createReducer, getType } from 'typesafe-actions';
import { companyControlActions, searchUserActions } from '@admin/store/actions';
import { RequisitesEntity, BankRequisitesEntity } from '@admin/entities';
import { Normalised } from '@utils/generics';

const initialState = {
    loading: false,
    isFetched: false,
    drawer: false,
    id: '',
    currentRequisitesId: '',
    name: '',
    users: [] as string[],
    contact: {
        phone: '',
        email: '',
        website: '',
        validation: { email: '', phone: '' },
    },
    requisites: [] as string[],
    foundUsers: [] as string[],
    entities: {
        requisites: {} as Normalised<RequisitesEntity>,
        bank: {} as Normalised<BankRequisitesEntity>,
    },
    validation: { name: '', users: '' },
};

export const companyControl = createReducer<typeof initialState>(initialState, {
    [getType(companyControlActions.setFetched)]: (state, { payload }) => ({
        ...state,
        isFetched: payload
    }),

    [getType(companyControlActions.getCompany.request)]: (state) => ({ ...state, loading: true }),

    [getType(companyControlActions.getCompany.success)]: (state, { payload }) => ({
        ...state,
        loading: false,
        isFetched: true,
        ...payload.result,
        entities: {
            ...state.entities,
            ...payload.entities,
        },
    }),

    [getType(companyControlActions.updateCompanyForm)]: (state, { payload }) => ({
        ...state,
        name: payload.name,
    }),

    [getType(companyControlActions.updateContactForm)]: (state, { payload }) => ({
        ...state,
        contact: { ...state.contact, ...payload },
    }),

    [getType(companyControlActions.setDrawerState)]: (state, { payload }) => ({
        ...state,
        drawer: payload,
    }),

    [getType(companyControlActions.updateCurrentRequisites)]: (state, { payload }) => ({
        ...state,
        drawer: true,
        currentRequisitesId: payload,
    }),

    [getType(companyControlActions.updateRequsitesForm)]: (state, { payload }) => ({
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

    [getType(companyControlActions.putRequsitesForm)]: (state, { payload }) => ({
        ...state,
        requisites: state.requisites.concat(payload.id),
        entities: {
            ...state.entities,
            requisites: {
                ...state.entities.requisites,
                [payload.id]: payload,
            },
        },
    }),

    [getType(companyControlActions.deleteRequsitesForm)]: (state, { payload }) => ({
        ...state,
        requisites: state.requisites.filter((id) => id !== payload),
    }),

    [getType(companyControlActions.updateBankForm)]: (state, { payload }) => ({
        ...state,
        entities: {
            ...state.entities,
            bank: {
                ...state.entities.bank,
                [payload.id]: {
                    ...(state.entities.bank[payload.id] || {}),
                    ...payload,
                },
            },
        },
    }),

    [getType(companyControlActions.putBankForm)]: (state, { payload }) => ({
        ...state,
        entities: {
            ...state.entities,
            requisites: {
                ...state.entities.requisites,
                [state.currentRequisitesId]: {
                    ...state.entities.requisites[state.currentRequisitesId],
                    bank: state.entities.requisites[state.currentRequisitesId].bank.concat(payload.id),
                }
            },
            bank: { ...state.entities.bank, [payload.id]: payload },
        },
    }),

    [getType(companyControlActions.deleteBankForm)]: (state, { payload }) => ({
        ...state,
        entities: {
            ...state.entities,
            requisites: {
                ...state.entities.requisites,
                [state.currentRequisitesId]: {
                    ...state.entities.requisites[state.currentRequisitesId],
                    bank: state.entities.requisites[state.currentRequisitesId].bank.filter(
                        (id) => id !== payload,
                    ),
                },
            },
        },
    }),


    [getType(companyControlActions.setValidationErrors)]: (state, { payload }) => ({
        ...state,
        contact: {
            ...state.contact,
            validation: { email: payload.errorEmail, phone: payload.errorPhone },
        },
        validation: { name: payload.errorName, users: payload.errorUsers },
    }),

    [getType(companyControlActions.clearValidationErrors)]: (state) => ({
        ...state,
        contact: {
            ...state.contact,
            validation: { email: '', phone: '' },
        },
        validation: { name: '', users: '' },
    }),

    [getType(searchUserActions.setFound)]: (state, { payload }) => ({
        ...state,
        foundUsers: payload,
    }),

    [getType(searchUserActions.select)]: (state, { payload }) => ({
        ...state,
        foundUsers: state.foundUsers.filter(((user) => user !== payload)),
        users: (state.users.some((usr) => usr === payload) ? state.users : [...state.users, payload]),
    }),

    [getType(searchUserActions.deleteSelected)]: (state, { payload }) => ({
        ...state,
        users: state.users.filter((item) => item !== payload),
    }),

    [getType(companyControlActions.clearForms)]: () => initialState,
});
