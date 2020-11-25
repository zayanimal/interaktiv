import { Observable, of, from, throwError, forkJoin } from 'rxjs';
import { toArray, map, mergeMap, tap, catchError, switchAll } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { CreateCompanyDto } from '@companies/dto/createCompanyDto';
import { Companies } from '@companies/entities/companies.entity';
import { ContactCompany } from '@companies/entities/contactCompany.entity';
import { Requisites } from '@companies/entities/requisites.entity';
import { Bank } from '@companies/entities/bank.entity';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(Companies)
        private readonly companyRepository: Repository<Companies>,
        @InjectRepository(ContactCompany)
        private readonly contactRepository: Repository<ContactCompany>,
        @InjectRepository(Requisites)
        private readonly requisitesRepository: Repository<Requisites>,
        @InjectRepository(Bank)
        private readonly bankRepository: Repository<Bank>
    ) {}

    create(companyDto: CreateCompanyDto) {
        return from(this.companyRepository.findOne({
            where: { name: companyDto.name }
        })).pipe(
            mergeMap((foundCompany) => (foundCompany
                ? throwError(
                    new HttpException('Компания уже существует', HttpStatus.BAD_REQUEST)
                )
                : of(this.companyRepository.create({ name: companyDto.name })).pipe(
                    mergeMap((createdCompany) => from(this.companyRepository.save(createdCompany)))
                )
            )),
            mergeMap((newCompany) => forkJoin({
                contact: of(this.contactRepository.create(companyDto.contact)).pipe(
                    mergeMap((createdContact) => {
                        createdContact.companyId = newCompany.id;

                        return from(this.contactRepository.save(createdContact));
                    })
                ),
                reqs: from(companyDto.requisites).pipe(
                    map((reqs) => this.requisitesRepository.create(reqs)),
                    mergeMap((prepReqs) => {
                        prepReqs.companiesId = newCompany.id;

                        return from(this.requisitesRepository.save(prepReqs)).pipe(
                            mergeMap((newReqs) => from(prepReqs.bank).pipe(
                                map((bankReqs) => this.bankRepository.create(bankReqs)),
                                mergeMap((createdBank) => {
                                    createdBank.requisitesId = newReqs.id;

                                    return from(this.bankRepository.save(createdBank));
                                }),
                                map(() => newReqs) // TODO: должно не задваиваться
                            ))
                        );
                    }),
                    toArray()
                ),
                id: of(newCompany.id)
            })),
            mergeMap(({ contact, reqs, id }) => {
                return from(this.companyRepository.findOne({ where: { id }})).pipe(
                    mergeMap((company) => {
                        company.contact = contact;
                        company.requisites = reqs;

                        return from(this.companyRepository.save(company));
                    })
                );
            })
        )
    }

    search(name: string) {
        return this.companyRepository.find({
            name: Raw((col) => `to_tsvector(${col}) @@ to_tsquery('${name}')`)
        });
    }
}
