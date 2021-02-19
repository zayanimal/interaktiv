import { IRouterItem } from '@system/interfaces/router.interface';

export const ROUTE_ITEMS: IRouterItem[] = [
    {
        key: 'ALL_ORDERS',
        path: '/all-orders',
        name: 'Все запросы',
        icon: 'AllInbox',
        component: 'Orders'
    },
    {
        key: 'MY_ORDERS',
        path: '/my-orders',
        name: 'Мои запросы',
        icon: 'Ballot',
        component: 'RequestsList'
    },
    {
        key: 'NEW_ORDER',
        path: '/new-order',
        name: 'Новый запрос',
        icon: 'AddBox',
        component: 'Request'
    },
    // {
    //     key: 'PERSONAL',
    //     path: '/personal',
    //     name: 'Мои данные',
    //     icon: 'AccountBox',
    //     component: ''
    // },
    {
        key: 'USERS',
        path: '/users',
        name: 'Пользователи',
        icon: 'People',
        component: 'Users'
    },
    {
        key: 'COMPANIES',
        path: '/companies',
        name: 'Компании',
        icon: 'Business',
        component: 'Companies'
    }
];
