import { of, from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Repository, EntityRepository, Raw } from 'typeorm';
import { Company } from '@company/entities/company.entity';
import { checkEntity } from '@shared/utils';
import { CreateCompanyDto } from '@company/dto/createCompany.dto';
import { catchServerError } from '@shared/utils';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
    searchName(name: string) {
        return this.find({
            where: {
                name: Raw((col) => `to_tsvector(${col}) @@ to_tsquery('${name}:*')`)
            },
            select: ['id', 'name']
        });
    }

    searchId(id: string) {
        return from(this.findOne({ id })).pipe(
            mergeMap(checkEntity('Компания не существует')),
        );
    }

    list() {
        return this.createQueryBuilder('company')
            .select([
                'company.id',
                'company.name',
                'company.time',
                'c.phone',
                'c.website'
            ])
            .leftJoin('company.contact', 'c', 'company.contactId = c.id')
            .orderBy('company.time', 'ASC');
    }

    createCompany(companyDto: CreateCompanyDto) {
        return of(this.create({ name: companyDto.name })).pipe(
            mergeMap((created) => from(this.save(created))),
        );
    }

    getFullCompany(id: string) {
        return from(this.createQueryBuilder('company')
            .select([
                'company.id',
                'company.name',
                'c.email',
                'c.phone',
                'c.website',
                'u.id',
                'u.username',
                'r.id',
                'r.name',
                'r.inn',
                'r.kpp',
                'r.ogrn',
                'b.id',
                'b.name',
                'b.rs',
                'b.ks',
                'b.bik',
                'b.address'
            ])
            .leftJoin('company.contact', 'c', 'company.contactId = c.id')
            .leftJoin('company.users', 'u', 'company.id = u.companyId')
            .leftJoin('company.requisites', 'r', 'company.id = r.companyId')
            .leftJoin('r.bank', 'b', 'r.id = b.requisitesId')
            .where('company.id = :id', { id })
            .getOne()).pipe(
                mergeMap(checkEntity('Компания не существует')),
                map((company) => ({
                    ...company,
                    users: company.users.map(({ username }) => username)
                }))
            );
    }
}
