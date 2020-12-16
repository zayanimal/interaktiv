// import { of, merge, forkJoin } from 'rxjs';
import {
    filter,
    // first,
    map,
    mergeMap,
    // catchError,
} from 'rxjs/operators';
import { Epic } from '@config/interfaces';
import { isActionOf } from 'typesafe-actions';
// import { systemActions } from '@system/store/actions';
import { userControlActions } from '@admin/store/actions';
// import { userSelectors, userControlSelectors } from '@admin/store/selectors';

/**
 * Получить данные пользователя для редактирования
 * @param action$
 * @param _
 * @param param юзер сервис
 */
export const getUser: Epic = (action$, _, { users }) => action$.pipe(
    filter(isActionOf(userControlActions.getUser.request)),
    mergeMap(({ payload }) => users.find$(payload)),
    map(({ response }) => userControlActions.getUser.success(response)),
);
