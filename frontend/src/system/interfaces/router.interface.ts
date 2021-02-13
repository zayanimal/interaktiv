export type LazyComponents = 'RequestsList' | 'Request' | 'Users' | 'Companies';

export interface IRouterItem {
    key: string;
    path: string;
    name: string;
    icon: string;
    component: LazyComponents;
}
