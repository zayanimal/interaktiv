import { Observable, merge, of, from, throwError, forkJoin } from 'rxjs';
import { toArray, map, mergeMap, tap, catchError, switchAll } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { UsersService } from '@users/services/users.service';
import { ContactService } from '@companies/services/contact.service';
import { RequisitesService } from '@companies/services/requisites.service';
import { CreateCompanyDto } from '@companies/dto/createCompanyDto';
import { Companies } from '@companies/entities/companies.entity';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(Companies)
        private readonly companyRepository: Repository<Companies>,
        private userService: UsersService,
        private contactService: ContactService,
        private requisitesService: RequisitesService
    ) {}

    /**
     * Поиск компании по имени
     * @param name
     */
    search(name: string) {
        return this.companyRepository.find({
            name: Raw((col) => `to_tsvector(${col}) @@ to_tsquery('${name}')`)
        });
    }

    /**
     * Проверить существует ли компания в базе, если нет создать новую
     * @param company
     * @param companyDto
     */
    checkCreateCompany(company: Companies, companyDto: CreateCompanyDto) {
        return of(company).pipe(
            mergeMap((foundCompany) => (foundCompany
                ? throwError(
                    new HttpException('Компания уже существует', HttpStatus.BAD_REQUEST)
                )
                : of(this.companyRepository.create({ name: companyDto.name })).pipe(
                    mergeMap((createdCompany) => from(this.companyRepository.save(createdCompany)))
                )
            ))
        );
    }

    /**
     * Создать новую компания со всеми зависимостями
     * @param companyDto
     */
    create(companyDto: CreateCompanyDto) {
        return from(this.companyRepository.findOne({
            where: { name: companyDto.name }
        })).pipe(
            mergeMap((check) => this.checkCreateCompany(check, companyDto)),
            mergeMap((newCompany) => forkJoin({
                user: this.userService.updateUserCompany(companyDto.users, newCompany.id),
                contact: this.contactService.create(companyDto.contact, newCompany.id),
                reqs: this.requisitesService.create(companyDto.requisites, newCompany.id),
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

    /**
     * Получить все данные о компании для дальнейшего редактирования
     * @param id
     */
    getFullCompany(id: string) {
        return from(this.companyRepository
            .createQueryBuilder('companies')
            .select([
                'companies.id',
                'companies.name',
                'c.email',
                'c.phone',
                'c.website',
                'u.username',
                'r.name',
                'r.inn',
                'r.kpp',
                'r.ogrn',
                'b.name',
                'b.rs',
                'b.ks',
                'b.bik',
                'b.address'
            ])
            .leftJoin('companies.contact', 'c', 'companies.contactId = c.id')
            .leftJoin('companies.users', 'u', 'companies.id = u.companiesId')
            .leftJoin('companies.requisites', 'r', 'companies.id = r.companiesId')
            .leftJoin('r.bank', 'b', 'r.id = b.requisitesId')
            .where('companies.id = :id', { id })
            .getOne()).pipe(
                map((company) => ({
                    ...company,
                    users: company.users.map(({ username }) => username)
                }))
            );
    }

    /**
     * Каскадное удаление компании со всеми зависимостями
     * @param companiesId
     */
    remove(companiesId: string) {
        return this.userService.removeUserCompany(companiesId).pipe(
            mergeMap(() => from(this.companyRepository.delete(companiesId))),
            map(() => ({ message: 'Компания полностью удалена' }))
        );
    }
}
