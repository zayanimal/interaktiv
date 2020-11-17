export interface ICreateUser {
    username: string;
    password: string;
    email: string;
    role: string;
    time: string;
    active: boolean;
    permissions: string[];
}

export type IUser = Omit<ICreateUser, 'password'>;
