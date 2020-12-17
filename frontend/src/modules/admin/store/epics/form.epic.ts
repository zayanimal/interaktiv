import { of } from 'rxjs';
import {
    filter,
    first,
    map,
    mergeMap,
    catchError,
    mapTo
} from 'rxjs/operators';
import { Epic } from '@config/interfaces';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { userControlActions } from '@admin/store/actions';
import { userControlSelectors } from '@admin/store/selectors';
import { UserFormEntity, ContactsEntity } from '@admin/entities';

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
    catchError((err) => of(systemActions.errorNotification(err.response.message))),
);

export const editUser: Epic = (action$, state$, { validation }) => action$.pipe(
    filter(isActionOf(userControlActions.editUser.request)),
    mergeMap(() => state$.pipe(
        first(),
        map((state) => ({
            ...userControlSelectors.newUser(state),
            contacts: new ContactsEntity(
                userControlSelectors.newContacts(state)
            )
        }))
    )),
    mergeMap((payload) => validation.check$(new UserFormEntity(payload))),
    mapTo(systemActions.successNotification('Пользователь изменён')),
    catchError((err) => of(userControlActions.setValidationErrors(err))),
);
