import { of, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Repository, EntityRepository } from 'typeorm';
import { ContactCompany } from '@company/entities';
import { ContactDto } from '@company/dto/contact.dto';

@EntityRepository(ContactCompany)
export class ContactRepository extends Repository<ContactCompany> {
    /**
     * Создать новые контакты компании
     * @param contact контактные данные
     * @param companyId айди компании
     */
    createContact(contact: ContactDto, companyId: string) {
        return of(this.create(contact)).pipe(
            mergeMap((createdContact) => from(
                this.save(createdContact.setCompanyId(companyId))
            ))
        )
    }

    /**
     * Обновить контакты компании
     * @param contact новые контактные данные
     * @param companyId айди компании
     */
    updateContact(contact: ContactDto, companyId: string) {
        return from(this.update({ companyId }, contact));
    }
}
