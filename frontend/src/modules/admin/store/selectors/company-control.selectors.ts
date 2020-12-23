import { pick } from 'lodash';
import { RootStateTypes } from '@config/roots';

interface FormEntity { [key: string]: string; }

const companyControlState = (state: RootStateTypes) => state.admin.companyControl;

export const loading = (state: RootStateTypes) => companyControlState(state).loading;

export const drawer = (state: RootStateTypes) => companyControlState(state).drawer;

export const id = (state: RootStateTypes) => companyControlState(state).id;

export const requisitesId = (state: RootStateTypes) => companyControlState(state).currentRequisitesId;

export const name = (state: RootStateTypes) => companyControlState(state).name;

export const users = (state: RootStateTypes) => companyControlState(state).users;

export const companyForm = (state: RootStateTypes) => pick(companyControlState(state), ['name']);

export const contactForm = (state: RootStateTypes): FormEntity => companyControlState(state).contact;

const entities = (state: RootStateTypes) => companyControlState(state).entities;

export const requisites = (state: RootStateTypes) => Object.values(entities(state).requisites);

export const requisitesById = (state: RootStateTypes) => entities(state).requisites[requisitesId(state)];
