import _ from 'lodash/fp';
import { RootStateTypes } from '@config/roots';

interface FormEntity { [key: string]: string; }

export const companyControlState = (state: RootStateTypes) => state.admin.companyControl;

export const loading = (state: RootStateTypes) => companyControlState(state).loading;

export const isFetched = (state: RootStateTypes) => companyControlState(state).isFetched;

export const drawer = (state: RootStateTypes) => companyControlState(state).drawer;

export const id = (state: RootStateTypes) => companyControlState(state).id;

export const requisitesId = (state: RootStateTypes) => companyControlState(state).currentRequisitesId;

export const name = (state: RootStateTypes) => companyControlState(state).name;

export const users = (state: RootStateTypes) => companyControlState(state).users;

export const companyForm = (state: RootStateTypes) => _.pick(['name', 'errorName'], companyControlState(state));

export const contactForm = (state: RootStateTypes): FormEntity => companyControlState(state).contact;

const entities = (state: RootStateTypes) => companyControlState(state).entities;

export const requisites = (state: RootStateTypes) => entities(state).requisites;

export const requisitesArr = (state: RootStateTypes) => _.pipe(
    companyControlState,
    _.get('requisites'),
    _.cond([
        [(arr) => !!arr?.length, _.map((id: string) => requisites(state)[id])],
        [_.T, _.always([])],
    ]),
)(state);

export const requisitesById = (state: RootStateTypes) => entities(state).requisites[requisitesId(state)];

const bankRequisitesIds = (state: RootStateTypes): string[] | undefined => requisitesById(state)?.bank;

const bankRequisitesItem = (state: RootStateTypes) => entities(state).bank;

export const bankRequisites = (state: RootStateTypes) => _.pipe(
    bankRequisitesIds,
    _.cond([
        [_.isArray, _.map((id: string) => bankRequisitesItem(state)[id])],
        [_.T, _.identity],
    ]),
)(state);

export const foundUsers = (state: RootStateTypes) => companyControlState(state).foundUsers;

export const companyFields = (state: ReturnType<typeof companyControlState>) => _.pick([
    'id',
    'name',
    'users',
], state);

export const validation = (state: RootStateTypes) => _.pick([
    'errorName',
    'errorEmail',
    'errorPhone',
    'errorUsers',
], companyControlState(state));
