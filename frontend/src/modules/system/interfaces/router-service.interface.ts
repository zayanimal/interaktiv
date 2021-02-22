import { IRouterItem } from '@system/interfaces';

export interface IRouterService {
    /**
     * Получить пулчить разделы дровера
     * @param keys привилегии
     */
    getRouterItems(keys: string[]): IRouterItem[];
}
