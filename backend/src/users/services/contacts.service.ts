import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactUser } from '@users/entities/contact-user.entity';
import { ContactsRepository } from '../repositories/contacts.repository';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(ContactsRepository)
        private readonly contactsRepository: ContactsRepository
    ) {}

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
