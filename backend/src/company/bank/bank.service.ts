import { omit } from 'lodash';
import { from, throwError } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '@company/bank/entities/bank.entity';
import { BankDto } from '@company/bank/bank.dto';

@Injectable()
export class BankService {
    constructor(
        @InjectRepository(Bank)
        private readonly bankRepository: Repository<Bank>
    ) {}

    /**
     * Создать новые банковские реквизиты компании
     * @param bankDto
     * @param id
     */
    create(bankDto: BankDto[], id: string) {
        return from(bankDto).pipe(
            map((bankReqs) => this.bankRepository.create(bankReqs)),
            mergeMap((createdBank) => {
                createdBank.requisitesId = id;

                return from(this.bankRepository.save(createdBank));
            }),
            catchError((err) => throwError(
                new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            ))
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
            catchError((err) => throwError(
                new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            ))
        );
    }

    /**
     * Удалить банк компании
     * @param id айди банка
     */
    remove(id: string) {
        return from(this.bankRepository.delete(id)).pipe(
            map(() => ({ message: 'Банковские реквизиты удалены' })),
            catchError((err) => throwError(
                new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            ))
        );
    }
}
