import { of, from, throwError, forkJoin } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { UsersService } from '@users/services/users.service';
import { ContactCompanyService } from '@company/contact-company/contact-company.service';
import { RequisitesService } from '@company/requisites/requisites.service';
import { CreateCompanyDto } from '@company/dto/createCompany.dto';
import { Company } from '@company/entities/company.entity';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
        private userService: UsersService,
        private contactService: ContactCompanyService,
        private requisitesService: RequisitesService
    ) {}

    /**
     * Поиск компании по имени
     * @param name
     */
    search(name: string) {
        return this.companyRepository.find({
            where: {
                name: Raw((col) => `to_tsvector(${col}) @@ to_tsquery('${name}:*')`)
            },
            select: ['id', 'name']
        });
    }

    checkCompany(company: Company | undefined) {
        return (company ? of(company) : throwError(
            new BadRequestException('Компания не существует')
        ));
    }

    /**
     * Поиск компании по id
     * @param id
     */
    searchId(id: string) {
        return from(this.companyRepository.findOne({ id })).pipe(
            mergeMap((company) => this.checkCompany(company))
        );
    }

    /**
     * Список компаний с пагинацией
     * @param page
     * @param limit
     */
    list(page: number, limit: number) {
        return from(
            paginate(this.companyRepository
                .createQueryBuilder('company')
                .select([
                    'company.id',
                    'company.name',
                    'company.time',
                    'c.phone',
                    'c.website'
                ])
                .leftJoin('company.contact', 'c', 'company.contactId = c.id')
                .orderBy('company.time', 'ASC'),
                { page, limit }
            )
        ).pipe(
            map(({ items, meta }) => ({ items, meta })),
            catchError((err) => throwError(
                new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            ))
        );
    }

    /**
     * Проверить существование компании
     * @param company
     */
    checkCompanyExistance(company: Company | undefined) {
        return (company
            ? of(company)
            : throwError(new HttpException('Компания не существует', HttpStatus.BAD_REQUEST))
        );
    }

    /**
     * Проверить существует ли компания в базе, если нет создать новую
     * @param company
     * @param companyDto
     */
    checkCreateCompany(company: Company | undefined, companyDto: CreateCompanyDto) {
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
                    mergeMap((cmp) => this.checkCompanyExistance(cmp)),
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
     * Обновление данных компании
     * @param id
     */
    update(id: string, data: CreateCompanyDto) {
        return from(this.companyRepository.findOne({ id })).pipe(
            mergeMap((cmp) => this.checkCompanyExistance(cmp)),
            mergeMap((company) => forkJoin([
                from(this.contactService.update(data.contact, company.id)),
                from(this.userService.updateUserCompany(data.users, company.id)),
                from(this.requisitesService.update(data.requisites))
            ])),
            mergeMap(() => from(this.companyRepository.update({ id }, {
                name: data.name
            }))),
            map(() => ({ message: 'Данные компании обновлены' }))
        );
    }

    /**
     * Получить все данные о компании для дальнейшего редактирования
     * @param id айди компании
     */
    getFullCompany(id: string) {
        return from(this.companyRepository
            .createQueryBuilder('company')
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
                mergeMap((cmp) => this.checkCompanyExistance(cmp)),
                map((company) => ({
                    ...company,
                    users: company.users.map(({ username }) => username)
                }))
            );
    }

    /**
     * Каскадное удаление компании со всеми зависимостями
     * @param companyId
     */
    remove(companyId: string) {
        return this.userService.removeUserCompany(companyId).pipe(
            mergeMap(() => from(this.companyRepository.delete(companyId))),
            map(() => ({ message: 'Компания полностью удалена' }))
        );
    }
}
