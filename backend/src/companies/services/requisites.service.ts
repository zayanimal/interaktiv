import { Observable, of, from, throwError, forkJoin } from 'rxjs';
import { toArray, map, mergeMap, tap, catchError, switchAll } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Requisites } from '@companies/entities/requisites.entity';
import { RequisitesDto } from '@companies/dto/requisitesDto';
import { BankService } from '@companies/services/bank.service';


@Injectable()
export class RequisitesService {
    constructor(
        @InjectRepository(Requisites)
        private readonly requisitesRepository: Repository<Requisites>,
        private bankSevice: BankService
    ) {}

    create(requisitesDto: RequisitesDto[], id: string) {
        return from(requisitesDto).pipe(
            map((reqs) => this.requisitesRepository.create(reqs)),
            mergeMap((prepReqs) => {
                prepReqs.companiesId = id;

                return from(this.requisitesRepository.save(prepReqs)).pipe(
                    mergeMap((newReqs) => forkJoin({
                        newReq: of(newReqs),
                        bank: this.bankSevice.create(prepReqs.bank, newReqs.id)
                    })),
                    map(({ newReq }) => newReq)
                );
            }),
            toArray()
        )
    }
}
