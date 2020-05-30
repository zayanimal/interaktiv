import { Epic } from 'redux-observable';
import { forkJoin, of } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import {
    filter,
    switchMap,
    catchError,
    map,
    mergeMap,
    first,
    delay,
    tap
} from 'rxjs/operators';
import { requestActions } from '@customer/store/actions';
import { requestDrawerActions } from '@customer/store/actions';
import { requestSelectors } from '@customer/store/selectors';
import { requestDrawerSelectors } from '@customer/store/selectors';
import { systemActions } from '@system/store/actions';

export const sendRequestNewProject: Epic = (action$, state$) => action$.pipe(
    filter(isActionOf(requestActions.sendNewProject)),
    switchMap(() => forkJoin({
            order: state$.pipe(
                first(),
                map(requestSelectors.orderForSend)
            ),
            endUser: state$.pipe(
                first(),
                map(requestDrawerSelectors.endUserData)
            )
        }).pipe(
            first(),
            tap(console.log)
        )
    ),
    mergeMap(() => [
        requestActions.clearOrder(),
        systemActions.successNotification('Ваш запрос успешно отправлен')
    ]),
    catchError(res => of(systemActions.errorNotification(res)))
);

export const clearRequestDrawer: Epic = (action$) => action$.pipe(
    filter(isActionOf(requestActions.clearOrder)),
    delay(0.5),
    mergeMap(() => [
        requestActions.clearInputPartnumber(),
        requestDrawerActions.clearDrawer()
    ])
);
