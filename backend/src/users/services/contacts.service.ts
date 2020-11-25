import { Injectable } from '@nestjs/common';
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
     * Создать контакты для пользователя
     * @param contacts
     */
    async create(contacts: Omit<ContactUser, 'id'>): Promise<ContactUser> {
        const contact = this.contactsRepository.create(contacts);

        await this.contactsRepository.save(contact);

        return contact;
    }
}
