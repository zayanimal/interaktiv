export type LazyComponents = 'RequestsList' | 'Request';

export interface IRouterItem {
    key: string;
    path: string;
    name: string;
    icon: string;
    component: LazyComponents;
}
