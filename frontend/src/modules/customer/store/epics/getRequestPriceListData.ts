import { requestActions } from '@customer/store/actions';
import { systemActions } from '@system/store/actions';
import { Epic } from 'redux-observable';
import { forkJoin, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import price from './price.json';

export const getRequestPriceListData: Epic = (action$) =>
    action$.pipe(
        filter(isActionOf(requestActions.fetchPriceList.request)),
        switchMap(() =>
            forkJoin({
                rate: fromFetch(
                    'https://www.cbr-xml-daily.ru/daily_json.js'
                ).pipe(
                    switchMap((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                        return of({
                            error: true,
                            message: `Error ${res.status}`
                        });
                    }),
                    catchError((err) => {
                        systemActions.errorNotification(err);
                        return of({ error: true, message: err.message });
                    })
                ),
                price: of(price)
            }).pipe(
                map(requestActions.fetchPriceList.success),
                catchError((mes: string) =>
                    of(requestActions.fetchPriceList.failure(mes))
                )
            )
        )
    );
