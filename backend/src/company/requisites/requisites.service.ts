import { omit } from 'lodash';
import { of, from, forkJoin } from 'rxjs';
import { toArray, map, mergeMap, filter, switchMapTo } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Requisites } from '@company/requisites/entities/requisites.entity';
import { RequisitesDto } from '@company/requisites/requisites.dto';
import { BankService } from '@company/bank/bank.service';
import { catchServerError } from '@shared/utils';

@Injectable()
export class RequisitesService {
    constructor(
        @InjectRepository(Requisites)
        private readonly requisitesRepository: Repository<Requisites>,
        private bankService: BankService
    ) {}

    /**
     * Создать новые реквизиты компании
     * @param requisitesDto данные реквизитов
     * @param companyId айди компании
     */
    create(requisitesDto: RequisitesDto[], companyId: string) {
        return from(requisitesDto).pipe(
            map((reqs) => this.requisitesRepository.create(reqs)),
            mergeMap((prepReqs) => {
                prepReqs.companyId = companyId;

                return from(this.requisitesRepository.save(prepReqs)).pipe(
                    mergeMap((newReqs) => (prepReqs?.bank?.length
                        ? forkJoin({
                            newReq: of(newReqs),
                            bank: this.bankService.create(prepReqs.bank, newReqs.id)
                        }).pipe(map(({ newReq }) => newReq))
                        : of(newReqs)
                    )),
                );
            }),
            toArray(),
            catchServerError()
        );
    }

    /**
     * Обновить реквизиты компании
     * @param requisitesDto данные реквизитов
     * @param companyId айди компании
     */
    update(requisitesDto: RequisitesDto[], companyId: string) {
        return of(requisitesDto).pipe(
            mergeMap((requisites) => (requisites.length
                ? from(this.requisitesRepository.find({ companyId })).pipe(
                    mergeMap((requisites) => from(requisites).pipe(
                        filter((item) => requisitesDto.some(({ id }) => item?.id !== id)),
                        mergeMap((filtredItem) => from(this.requisitesRepository.remove(filtredItem))),
                        switchMapTo(from(requisitesDto))
                    ))
                ) : from(this.requisitesRepository.find({ companyId })).pipe(
                    mergeMap((filtredItem) => from(this.requisitesRepository.remove(filtredItem))),
                    switchMapTo(from(requisitesDto))
                )
            )),
            mergeMap((requisites) => from(this.requisitesRepository.findOne(requisites.id)).pipe(
                mergeMap((found) => (found
                    ? forkJoin([
                        from(this.requisitesRepository.update(
                            { id: requisites.id },
                            omit(requisites, ['id', 'bank'])
                        )),
                        this.bankService.update(requisites.bank)
                    ])
                    : this.create(requisitesDto, companyId)
                ))
            )),
        );
    }

    /**
     * Удалить реквизиты компании
     * @param id айди реквизитов
     */
    remove(id: string) {
        return from(this.requisitesRepository.delete(id)).pipe(
            map(() => ({ message: 'Реквизиты удалены' })),
            catchServerError()
        );
    }
}
