import { of, merge, throwError } from 'rxjs';
import {
    filter,
    map,
    mapTo,
    mergeMap,
    switchMap,
    switchMapTo,
    first,
    catchError,
} from 'rxjs/operators';
import { pick } from 'lodash';
import { normalize, denormalize, schema } from 'normalizr';
import { plainToClass } from 'class-transformer';
import uuid from 'uuid-random';
import { Epic } from '@config/interfaces';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { companiesActions, companyControlActions } from '@admin/store/actions';
import { companyControlSelectors } from '@admin/store/selectors';
import {
    CompanyEntity,
    CompanyContactEntity,
    RequisitesEntity,
    BankRequisitesEntity
} from '@admin/entities';


const bankSchema = new schema.Entity('bank');
const requisitesSchema = new schema.Entity('requisites', {
    bank: [bankSchema]
});
const companySchema = { requisites: [requisitesSchema] };

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
        of(systemActions.errorNotification(err?.response?.message)),
    )),
);

/**
 * Обновить данные компании
 * @param action$
 * @param state$
 * @param param2
 */
export const updateCompany: Epic = (action$, state$, { company, validation }) => action$.pipe(
    filter(isActionOf(companyControlActions.updateCompany)),
    switchMapTo(state$.pipe(
        first(),
        map(companyControlSelectors.companyControlState),
        mergeMap((state) => of(state).pipe(
            map(({ requisites, entities }) => denormalize(
                { requisites },
                companySchema,
                entities,
            )),
            map(({ requisites }) => plainToClass(
                CompanyEntity,
                {
                    ...companyControlSelectors.companyFields(state),
                    contact: plainToClass(CompanyContactEntity, state.contact),
                    requisites: plainToClass(
                        RequisitesEntity,
                        requisites.map((req: RequisitesEntity) => ({
                            ...req,
                            bank: plainToClass(BankRequisitesEntity, req.bank)
                        }))
                    ),
                }
            )),
        )),
    )),
    mergeMap((fields) => validation.check$(fields)),
    // switchMap((entity) => company.update$(entity).pipe(
    //     catchError((err, caught) => merge(
    //         caught,
    //         of(systemActions.errorNotification(err.message)),
    //     )),
    // )),
    switchMapTo(merge(
        of(companyControlActions.clearValidationErrors()),
        of(companyControlActions.setDrawerState(false)),
        of(systemActions.successNotification('Компания обновлена')),
    )),
    catchError((err, caught) => merge(
        caught,
        of(companyControlActions.setValidationErrors(pick(err, [
            'errorName',
            'errorEmail',
            'errorPhone',
            'errorUsers'
        ])))
    )),
);

export const createCompany: Epic = (action$, state$, { company }) => action$.pipe(
    filter(isActionOf(companyControlActions.createCompany)),
    switchMapTo(state$.pipe(
        first(),
        map(companyControlSelectors.companyControlState),
        mergeMap((state) => of(state).pipe(
            map(({ requisites, entities }) => denormalize(
                { requisites },
                companySchema,
                entities,
            )),
            map(({ requisites }) => ({
                name: state.name,
                users: state.users,
                contact: state.contact,
                requisites,
            })),
        )),
        mergeMap((payload) => (payload.users.length
            ? of(payload)
            : throwError({ message: 'Должен быть указан, хотя бы один пользователь' }))),
        switchMap((entity) => company.create$(entity)),
        mapTo(systemActions.successNotification('Компания добавлена')),
        catchError((err, caught) => merge(
            caught,
            of(systemActions.errorNotification(err.message)),
        )),
    )),
);

/**
 * Удаление компании
 * @param action$
 * @param state$
 * @param services
 */
export const deleteCompany: Epic = (action$, _, { company }) => action$.pipe(
    filter(isActionOf(companyControlActions.deleteCompany)),
    mergeMap(({ payload }) => company.delete$(payload).pipe(
        mergeMap(() => merge(
            of(companiesActions.setFiltredCompaniesList(payload)),
            of(systemActions.successNotification('Компания удалена')),
        ))
    )),
    catchError((err, caught) => merge(
        caught,
        of(systemActions.errorNotification(err.message)),
    )),
);

/**
 * Создать новые реквизиты
 * @param action$
 */
export const createRequisites: Epic = (action$) => action$.pipe(
    filter(isActionOf(companyControlActions.createRequsitesForm)),
    map(uuid),
    mergeMap((id) => merge(
        of(companyControlActions.putRequsitesForm(new RequisitesEntity(id))),
        of(companyControlActions.updateCurrentRequisites(id)),
    )),
);

/**
 * Создать новые банковские реквизиты
 * @param action$
 */
export const createBankRequisites: Epic = (action$) => action$.pipe(
    filter(isActionOf(companyControlActions.createBankForm)),
    map(uuid),
    map((id) => companyControlActions.putBankForm(new BankRequisitesEntity(id))),
);
