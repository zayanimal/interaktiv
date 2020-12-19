import { IPaginationMeta } from '@shared/interfaces';
import { UserFormEntity } from '@admin/entities';

export type IUser = Omit<UserFormEntity, 'password'>;

export type INewUser = Omit<UserFormEntity, 'time' | 'active'>;

export interface IUsersInitialState {
    list: IUser[],
    meta: IPaginationMeta;
    userEditMode: boolean;
    userEditName: string;
}
