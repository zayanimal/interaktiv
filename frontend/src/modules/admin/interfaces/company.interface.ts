import { IPaginationMeta } from '@shared/interfaces';

export interface ICompanyContact {
    email: string;
    phone: string;
    website: string;
}

export interface ICompanyListItem {
    id: string;
    name: string;
    time: string;
    contact: ICompanyContact;
}

export interface ICompaniesInitialState {
    list: ICompanyListItem[],
    meta: IPaginationMeta;
    companyEditMode: boolean;
    companyEditName: string;
}
