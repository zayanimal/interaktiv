import { Observable } from 'rxjs';
import { Good } from '@good/entities/good.entity';
import { IMessage } from '@shared/interfaces/message.interface';

export interface IGoodService {
    /**
     * Добавить позиции в базу из файла xls
     * @param buffer файл прайслиста
     * @param vendor название вендора
     */
    createFromFile(buffer: ArrayBuffer, vendor: string): Observable<IMessage>;

    /**
     * Очистить дубли оставшиейся после загрузки прайслиста
     */
    cleanDublicates(): Observable<Good[]>;

    /**
     * Проверить существование товара
     * @param good
     */
    checkGoodExistance(good: Good | undefined): Observable<Good>

    /**
     * Поиск товара по заданной подстроке
     * @param name
     */
    search(name: string): Observable<Good[]>

    /**
     * Поиск товара по id
     * @param id
     */
    searchId(id: string): Observable<Good>
}
