import { IRouterService } from '@system/interfaces';
import { ROUTE_ITEMS } from '@system/constants/router.constants';

export class RouterService implements IRouterService {
    public getRouterItems(keys: string[]) {
        return ROUTE_ITEMS.filter(
            (item) => item.key === keys.find(
                (key: string) => item.key === key,
            ),
        );
    }
}
