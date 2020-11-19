export interface ICreateUser {
    username: string;
    password: string;
    role: string;
    time: string;
    active: boolean;
    permissions: string[];
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
