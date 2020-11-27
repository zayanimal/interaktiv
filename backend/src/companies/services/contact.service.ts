import { of, from, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactCompany } from '@companies/entities/contactCompany.entity';
import { ContactDto } from '@companies/dto/contact.dto';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(ContactCompany)
        private readonly contactRepository: Repository<ContactCompany>
    ) {}

    /**
     * Создать новые контакты компании
     * @param contact контактные данные
     * @param companyId айди компании
     */
    create(contact: ContactDto, companyId: string) {
        return of(this.contactRepository.create(contact)).pipe(
            mergeMap((createdContact) => {
                createdContact.companyId = companyId;

                return from(this.contactRepository.save(createdContact));
            }),
            catchError((err) => throwError(
                new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            ))
        )
    }

    /**
     * Обновить контакты компании
     * @param contact новые контактные данные
     * @param companyId айди компании
     */
    update(contact: ContactDto, companyId: string) {
        return from(this.contactRepository.update({ companyId }, contact)).pipe(
            catchError((err) => throwError(
                new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            ))
        );
    }
}
