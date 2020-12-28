import { omit } from 'lodash';
import { from, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '@company/bank/entities/bank.entity';
import { BankDto } from '@company/bank/bank.dto';
import { catchServerError } from '@shared/utils';

@Injectable()
export class BankService {
    constructor(
        @InjectRepository(Bank)
        private readonly bankRepository: Repository<Bank>
    ) {}

    /**
     * Создать новые банковские реквизиты компании
     * @param bankDto
     * @param requisitesId
     */
    create(bankDto: BankDto[], requisitesId: string) {
        return from(bankDto).pipe(
            map((bankReqs) => this.bankRepository.create(bankReqs)),
            mergeMap((createdBank) => {
                createdBank.requisitesId = requisitesId;

                return from(this.bankRepository.save(createdBank));
            }),
            catchServerError()
        )
    }

    /**
     * Обновить банковские реквизиты компании
     * @param bankDto
     */
    update(bankDto: BankDto[]) {
        return from(bankDto).pipe(
            mergeMap((bank) => from(this.bankRepository.update(
                { id: bank.id },
                omit(bank, ['id'])
            ))),
            catchServerError()
        );
    }

    /**
     * Удалить банк компании
     * @param id айди банка
     */
    remove(id: string) {
        return from(this.bankRepository.delete(id)).pipe(
            map(() => ({ message: 'Банковские реквизиты удалены' })),
            catchServerError()
        );
    }
}
