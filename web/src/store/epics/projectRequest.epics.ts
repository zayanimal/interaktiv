import { Epic } from 'redux-observable';
import { forkJoin,  from, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { isActionOf } from 'typesafe-actions';
import { map, filter, switchMap, catchError, take } from 'rxjs/operators';
import { fetchPriceList } from '@actions/projectRequest.actions';
import price from './price.json';

export const fetchPriceListEpic: Epic = action$ => action$.pipe(
    filter(isActionOf(fetchPriceList.request)),
    switchMap(() =>
        forkJoin({
            rate: fromFetch('https://www.cbr-xml-daily.ru/daily_json.js').pipe(
                switchMap(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return of({ error: true, message: `Error ${res.status}`})
                    }
                }),
                catchError(err => {
                    console.error(err);
                    return of({ error: true, message: err.message })
                })
            ),
            price: from([price])
        }).pipe(
            take(1),
            map(fetchPriceList.success),
            catchError((mes: string) => of(fetchPriceList.failure(mes)))
        )
    )
);
