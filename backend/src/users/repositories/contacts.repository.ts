import { Repository, EntityRepository } from 'typeorm';
import { ContactUser } from '@users/entities';

@EntityRepository(ContactUser)
export class ContactsRepository extends Repository<ContactUser> {}
