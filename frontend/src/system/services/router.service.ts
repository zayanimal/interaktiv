import { IRouterItem } from '@system/interfaces/routerItem.interface';
import { ROUTE_ITEMS } from '@system/constants/router.constants';

class RouterService {
    constructor(private routeItems: IRouterItem[]) {}

    getRouterItems(keys: string[]): IRouterItem[] {
        return this.routeItems.filter(
            (item) => item.key === keys.find(
                (key: string) => item.key === key
            )
        );
    }
}

export const routerService = new RouterService(ROUTE_ITEMS);
