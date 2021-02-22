import { IPaginationMeta } from '@shared/interfaces';

export interface IOrdersInitialState {
    list: object[];
    meta: IPaginationMeta;
    orderEditMode: boolean;
    orderEditName: string;
}
