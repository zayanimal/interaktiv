import { requestActions, requestDrawerActions } from '@customer/store/actions';
import { requestDrawerSelectors, requestSelectors } from '@customer/store/selectors';
import { systemActions } from '@system/store/actions';
import { Epic } from 'redux-observable';
import { forkJoin, of } from 'rxjs';
import {
    catchError,
    delay,
    filter,
    first,
    map,
    mergeMap,
    switchMap,
    tap
} from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';


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
    )),
    mergeMap(() => [
        requestActions.clearOrder(),
        systemActions.successNotification('Ваш запрос успешно отправлен')
    ]),
    catchError((res) => of(systemActions.errorNotification(res)))
);

export const clearRequestDrawer: Epic = (action$) => action$.pipe(
    filter(isActionOf(requestActions.clearOrder)),
    delay(0.5),
    map(requestDrawerActions.clearDrawer)
);
