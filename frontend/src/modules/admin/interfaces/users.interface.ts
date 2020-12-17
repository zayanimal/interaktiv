export interface Contacts {
    email: string;
    phone: string;
    position: string;
}

export interface ICreateUser {
    username: string;
    password: string;
    role: string;
    time: string;
    permissions: string[];
    contacts: Contacts;
}

export type IUser = Omit<ICreateUser, 'password'>;

export type INewUser = Omit<ICreateUser, 'time' | 'active'>;

export interface IUsersMeta {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}
