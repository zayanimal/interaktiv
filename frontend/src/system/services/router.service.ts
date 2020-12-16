import { IRouterItem } from '@system/interfaces/routerItem.interface';
import { ROUTE_ITEMS } from '@system/constants/router.constants';

export class RouterService {
    getRouterItems(keys: string[]): IRouterItem[] {
        return ROUTE_ITEMS.filter(
            (item) => item.key === keys.find(
                (key: string) => item.key === key,
            ),
        );
    }
}
