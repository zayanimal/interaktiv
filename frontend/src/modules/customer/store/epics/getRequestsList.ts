import { requestsListActions } from '@customer/store/actions';
import { systemActions } from '@system/store/actions';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import requestsList from './requests.json';

export const getRequestsList: Epic = (action$) =>
    action$.pipe(
        filter(isActionOf(requestsListActions.getRequestsList.request)),
        switchMap(() =>
            of(requestsList).pipe(
                map(requestsListActions.getRequestsList.success),
                catchError((err) => {
                    systemActions.errorNotification(err);
                    return of({ error: true, message: err.message });
                })
            )
        )
    );
