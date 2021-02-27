import { IPaginationMeta } from '@shared/interfaces';

export interface OrdersInitialState {
    list: object[];
    meta: IPaginationMeta;
    orderEditMode: boolean;
    orderEditName: string;
}
