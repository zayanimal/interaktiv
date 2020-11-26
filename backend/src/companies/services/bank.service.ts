import { Observable, of, from, throwError, forkJoin } from 'rxjs';
import { toArray, map, mergeMap, tap, catchError, switchAll } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '@companies/entities/bank.entity';
import { BankDto } from '@companies/dto/bankDto';

@Injectable()
export class BankService {
    constructor(
        @InjectRepository(Bank)
        private readonly bankRepository: Repository<Bank>
    ) {}

    create(bankDto: BankDto[], id: string) {
        return from(bankDto).pipe(
            map((bankReqs) => this.bankRepository.create(bankReqs)),
            mergeMap((createdBank) => {
                createdBank.requisitesId = id;

                return from(this.bankRepository.save(createdBank));
            })
        )
    }
}
