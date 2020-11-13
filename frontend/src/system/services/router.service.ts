import { FC, lazy } from 'react';
import { IRouterItem, LazyComponents } from '@system/interfaces/routerItem.interface';
import { ROUTE_ITEMS } from '@system/constants/router.constants';

const RequestsListLazy = lazy(() => import('@customer/containers/RequestsList'));
const RequestLazy = lazy(() => import('@customer/containers/Request'));

class RouterService {
    constructor(
        private routeItems: IRouterItem[],
        private RequestsList: FC,
        private Request: FC
    ) {}

    getRouterItems(keys: string[]): IRouterItem[] {
        return this.routeItems.filter(
            (item) => item.key === keys.find(
                (key: string) => item.key === key
            )
        );
    }

    createComponent(name: LazyComponents) {
        return this[name];
    }
}

export const routerService = new RouterService(
    ROUTE_ITEMS,
    RequestsListLazy,
    RequestLazy
);
