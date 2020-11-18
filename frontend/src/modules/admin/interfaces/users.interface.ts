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
