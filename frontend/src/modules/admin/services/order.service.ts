import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RestService } from '@system/services/rest.service';
// import { IListableService } from '@admin/interfaces';
// import { CompanyEntity } from '@admin/entities';
import orders from '@admin/services/__mock__/orders.json';

export class OrderService {
    constructor(private readonly api: RestService) {}

    public getList$(page: number) {
        return of({ response: orders }).pipe(delay(500));
    }
}
