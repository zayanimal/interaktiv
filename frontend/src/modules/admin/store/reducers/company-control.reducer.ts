import { createReducer, getType } from 'typesafe-actions';
import { companyControlActions, searchUserActions } from '@admin/store/actions';
import { RequisitesEntity, BankRequisitesEntity } from '@admin/entities';
import { Normalised } from '@utils/generics';

const initialState = {
    drawer: false,
    loading: false,
    id: '',
    currentRequisitesId: '',
    name: '',
    users: [] as string[],
    contact: { phone: '', email: '', website: '' },
    requisites: [] as string[],
    foundUsers: [] as string[],
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
});
