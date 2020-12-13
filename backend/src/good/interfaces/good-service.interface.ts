import { Observable } from 'rxjs';
import { Good, GoodView } from '@good/entities';
import { GoodEntity } from '@good/serializers';
import { IMessage } from '@shared/interfaces/message.interface';

export interface IGoodService {
    /**
     * Добавить позиции в базу из файла xls
     * @param buffer файл прайслиста
     * @param vendor название вендора
     */
    updatePricelist(buffer: ArrayBuffer, vendor: string): Observable<IMessage>;

    /**
     * Список позиций прайслиста
     * Чистый кост
     */
    list(): Promise<GoodView[]>

    /**
     * Поиск товара по заданной подстроке
     * Кост включает в себя базовую прибыль
     * @param name
     */
    search(name: string): Observable<GoodEntity[]>

    /**
     * Поиск товара по id
     * @param id
     */
    searchId(id: string): Observable<Good>
}
