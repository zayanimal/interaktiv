import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacts } from '@contacts/entities/contacts.entity';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contacts)
        private readonly contactsRepository: Repository<Contacts>
    ) {}

    /**
     * Создать контакты для пользователя
     * @param contacts
     */
    async create(contacts: Omit<Contacts, 'id'>): Promise<Contacts> {
        const contact = this.contactsRepository.create(contacts);

        await this.contactsRepository.save(contact);

        return contact;
    }
}
