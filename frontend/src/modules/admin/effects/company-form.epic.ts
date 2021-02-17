import { of, merge } from 'rxjs';
import {
    filter,
    map,
    mapTo,
    mergeMap,
    switchMap,
    switchMapTo,
    first,
    catchError
} from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import uuid from 'uuid-random';
import { Epic } from '@config/interfaces';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { Normalizator } from '@system/services';
import { companiesActions, companyControlActions } from '@admin/store/actions';
import { companyControlSelectors } from '@admin/store/selectors';
import {
    CompanyEntity,
    CompanyContactEntity,
    RequisitesEntity,
    BankRequisitesEntity
} from '@admin/entities';

const nrmlztr = new Normalizator('requisites');

/**
 * Получить список компаний с пагинацией
 * @param action$
 * @param state$
 * @param services
 */
export const getCompany: Epic = (action$, _, { company }) =>
    action$.pipe(
        filter(isActionOf(companyControlActions.getCompany.request)),
        mergeMap(({ payload }) => company.findId(payload)),
        map(({ response }) => plainToClass(CompanyEntity, response)),
        map((entity) =>
            companyControlActions.getCompany.success(nrmlztr.normalize(entity))
        ),
        catchError((err, caught) =>
            merge(
                caught,
                of(systemActions.errorNotification(err?.response?.message))
            )
        )
    );

/**
 * Обновить данные компании
 * @param action$
 * @param state$
 * @param param2
 */
export const updateCompany: Epic = (action$, state$, { company, validation }) =>
    action$.pipe(
        filter(isActionOf(companyControlActions.updateCompany)),
        switchMapTo(
            state$.pipe(
                first(),
                map(companyControlSelectors.companyControlState),
                mergeMap((state) =>
                    of(state).pipe(
                        map(({ requisites, entities }) =>
                            nrmlztr.denormalize(requisites, entities)
                        ),
                        map(({ requisites }) =>
                            plainToClass(CompanyEntity, {
                                ...companyControlSelectors.companyFields(state),
                                contact: plainToClass(
                                    CompanyContactEntity,
                                    state.contact
                                ),
                                requisites: plainToClass(
                                    RequisitesEntity,
                                    requisites.map((req: RequisitesEntity) => ({
                                        ...req,
                                        bank: plainToClass(
                                            BankRequisitesEntity,
                                            req.bank
                                        )
                                    }))
                                )
                            })
                        )
                    )
                )
            )
        ),
        mergeMap((fields) => validation.checkEntities$(fields)),
        /** TODO: в сущности contact id не должно вызывать ошибку бэка */
        switchMap((entity) => company.update$(entity)),
        switchMapTo(
            merge(
                of(companyControlActions.clearValidationErrors()),
                of(companyControlActions.setDrawerState(false)),
                of(systemActions.successNotification('Компания обновлена'))
            )
        ),
        catchError((err, caught) =>
            merge(
                caught,
                of(
                    companyControlActions.getCompany.success(
                        nrmlztr.normalize(err)
                    )
                ),
                of(
                    systemActions.infoNotification(
                        'Проверьте ошибки в реквизитах'
                    )
                )
            )
        )
    );

export const createCompany: Epic = (action$, state$, { company, validation }) =>
    action$.pipe(
        filter(isActionOf(companyControlActions.createCompany)),
        switchMapTo(
            state$.pipe(
                first(),
                map(companyControlSelectors.companyControlState),
                mergeMap((state) =>
                    of(state).pipe(
                        map(({ requisites, entities }) =>
                            nrmlztr.denormalize(requisites, entities)
                        ),
                        map(({ requisites }) =>
                            plainToClass(CompanyEntity, {
                                name: state.name,
                                users: state.users,
                                contact: state.contact,
                                requisites
                            })
                        ),
                        mergeMap((entity) => validation.check$(entity))
                    )
                ),
                switchMap((entity) => company.create$(entity)),
                mapTo(systemActions.successNotification('Компания добавлена')),
                catchError((err, caught) =>
                    merge(
                        caught,
                        of(systemActions.errorNotification(err.message))
                    )
                )
            )
        )
    );

/**
 * Удаление компании
 * @param action$
 * @param state$
 * @param services
 */
export const deleteCompany: Epic = (action$, _, { company }) =>
    action$.pipe(
        filter(isActionOf(companyControlActions.deleteCompany)),
        mergeMap(({ payload }) =>
            company
                .delete$(payload)
                .pipe(
                    mergeMap(() =>
                        merge(
                            of(
                                companiesActions.setFiltredCompaniesList(
                                    payload
                                )
                            ),
                            of(
                                systemActions.successNotification(
                                    'Компания удалена'
                                )
                            )
                        )
                    )
                )
        ),
        catchError((err, caught) =>
            merge(caught, of(systemActions.errorNotification(err.message)))
        )
    );

/**
 * Создать новые реквизиты
 * @param action$
 */
export const createRequisites: Epic = (action$) =>
    action$.pipe(
        filter(isActionOf(companyControlActions.createRequsitesForm)),
        map(uuid),
        mergeMap((id) =>
            merge(
                of(
                    companyControlActions.putRequsitesForm(
                        new RequisitesEntity(id)
                    )
                ),
                of(companyControlActions.updateCurrentRequisites(id))
            )
        )
    );

/**
 * Создать новые банковские реквизиты
 * @param action$
 */
export const createBankRequisites: Epic = (action$) =>
    action$.pipe(
        filter(isActionOf(companyControlActions.createBankForm)),
        map(uuid),
        map((id) =>
            companyControlActions.putBankForm(new BankRequisitesEntity(id))
        )
    );
