import { of, throwError } from 'rxjs';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactUser } from '@users/entities/contactUser.entity';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(ContactUser)
        private readonly contactsRepository: Repository<ContactUser>
    ) {}

    /**
     * Проверить существование контакта пользователя
     * @param contact
     */
    checkContact(contact: ContactUser | undefined) {
        return (contact
            ? of(contact)
            : throwError(new HttpException('Пользователь не существует', HttpStatus.BAD_REQUEST))
        )
    }

    /**
     * Создать контакты для пользователя
     * @param contacts
     */
    async create(contacts: Omit<ContactUser, 'id'>): Promise<ContactUser> {
        const contact = this.contactsRepository.create(contacts);

        await this.contactsRepository.save(contact);

        return contact;
    }
}
