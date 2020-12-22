import { of, merge } from 'rxjs';
import {
    filter,
    map,
    mergeMap,
    catchError,
} from 'rxjs/operators';
import { normalize, schema } from 'normalizr';
import { Epic } from '@config/interfaces';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { companyControlActions } from '@admin/store/actions';

const companySchema = { requisites: [
    new schema.Entity('requisites', { bank: [
        new schema.Entity('bank')
    ] })
] };

/**
 * Получить список компаний с пагинацией
 * @param action$
 * @param state$
 * @param services
 */
export const getCompany: Epic = (action$, _, { company }) => action$.pipe(
    filter(isActionOf(companyControlActions.getCompany.request)),
    mergeMap(({ payload }) => company.findId(payload)),
    map(({ response }) => companyControlActions.getCompany.success(
        normalize(response, companySchema),
    )),
    catchError((err, caught) => merge(
        caught,
        of(systemActions.errorNotification(err.message)),
    )),
);
