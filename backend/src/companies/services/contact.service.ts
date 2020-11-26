import { Observable, of, from, throwError, forkJoin } from 'rxjs';
import { toArray, map, mergeMap, tap, catchError, switchAll } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactCompany } from '@companies/entities/contactCompany.entity';
import { ContactDto } from '@companies/dto/contactDto';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(ContactCompany)
        private readonly contactRepository: Repository<ContactCompany>
    ) {}

    create(contact: ContactDto, companyId: string) {
        return of(this.contactRepository.create(contact)).pipe(
            mergeMap((createdContact) => {
                createdContact.companyId = companyId;

                return from(this.contactRepository.save(createdContact));
            })
        )
    }
}
