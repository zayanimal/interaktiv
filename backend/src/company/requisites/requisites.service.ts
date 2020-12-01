import { omit } from 'lodash';
import { of, from, forkJoin, throwError } from 'rxjs';
import { toArray, map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Requisites } from '@company/requisites/entities/requisites.entity';
import { RequisitesDto } from '@company/requisites/requisites.dto';
import { BankService } from '@company/bank/bank.service';

@Injectable()
export class RequisitesService {
    constructor(
        @InjectRepository(Requisites)
        private readonly requisitesRepository: Repository<Requisites>,
        private bankSevice: BankService
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
                            bank: this.bankSevice.create(prepReqs.bank, newReqs.id)
                        }).pipe(map(({ newReq }) => newReq))
                        : of(newReqs)
                    )),
                );
            }),
            toArray(),
            catchError((err) => throwError(
                new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            ))
        )
    }

    /**
     * Обновить реквизиты компании
     * @param requisitesDto
     */
    update(requisitesDto: RequisitesDto[]) {
        return from(requisitesDto).pipe(
            mergeMap((requisites) => forkJoin([
                from(this.requisitesRepository.update(
                    { id: requisites.id },
                    omit(requisites, ['id', 'bank'])
                )),
                from(this.bankSevice.update(requisites.bank))
            ])),
            catchError((err) => throwError(
                new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            ))
        );
    }

    /**
     * Удалить реквизиты компании
     * @param id айди реквизитов
     */
    remove(id: string) {
        return from(this.requisitesRepository.delete(id)).pipe(
            map(() => ({ message: 'Реквизиты удалены' })),
            catchError((err) => throwError(
                new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            ))
        );
    }
}
