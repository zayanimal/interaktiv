import { of } from 'rxjs';
import {
    filter,
    map,
    mergeMap,
    catchError
} from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { usersActions } from '@admin/store/actions';
import { systemActions } from '@system/store/actions';
import { userService } from '@admin/services/users.service';

/**
 * Получить список пользователей с пагинацией
 * @param action$
 */
export const getUsersList: Epic = (action$) => action$.pipe(
    filter(isActionOf(usersActions.getUsersList.request)),
    mergeMap(({ payload }) => userService.getList(payload)),
    map(({ response }) => usersActions.getUsersList.success(response)),
    catchError((err) => of(systemActions.errorNotification(err.message)))
);
