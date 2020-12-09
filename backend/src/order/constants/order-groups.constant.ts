import { checkGroup } from '@order/utils/order.util';

export const MARGIN_GROUP = checkGroup(['admin', 'distributor']);
export const DISCOUNT_GROUP = checkGroup(['admin', 'vendor', 'distributor']);
