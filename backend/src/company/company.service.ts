import { of, from, throwError, forkJoin } from 'rxjs';
import { map, mapTo, mergeMap, mergeMapTo } from 'rxjs/operators';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { UsersService } from '@users/services/users.service';
import { RequisitesService } from '@company/requisites/requisites.service';
import { CreateCompanyDto, UpdateCompanyDto } from '@company/dto';
import { Company } from '@company/entities/company.entity';
import { CompanyRepository, ContactRepository } from '@company/repositories';
import { checkEntity, catchServerError } from '@shared/utils';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyRepository)
        private readonly companyRepository: CompanyRepository,
        @InjectRepository(ContactRepository)
        private readonly contactRepository: ContactRepository,
        private userService: UsersService,
        private requisitesService: RequisitesService
    ) {}

    errorMessage = 'Компания не существует';

    /**
     * Поиск компании по имени
     * @param name
     */
    search(name: string) { return this.companyRepository.searchName(name); }

    /**
     * Поиск компании по id
     * @param id
     */
    searchId(id: string) { return this.companyRepository.searchId(id); }

    /**
     * Список компаний с пагинацией
     * @param page
     * @param limit
     */
    list(page: number, limit: number) {
        return from(
            paginate(
                this.companyRepository.list(),
                { page, limit }
            )
        ).pipe(
            map(({ items, meta }) => ({ items, meta })),
            catchServerError()
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
                ? throwError(new BadRequestException('Компания уже существует'))
                : this.companyRepository.createCompany(companyDto)
            )),
            catchServerError()
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
                contact: this.contactRepository.createContact(companyDto.contact, newCompany.id),
                requisites: this.requisitesService.create(companyDto.requisites, newCompany.id),
                id: of(newCompany.id)
            })),
            mergeMap(({ contact, requisites, id }) => {
                return from(this.companyRepository.findOne({ where: { id }})).pipe(
                    mergeMap(checkEntity(this.errorMessage)),
                    mergeMap((company) => from(
                        this.companyRepository.save(company.set({ contact, requisites }))
                    ))
                );
            }),
            catchServerError()
        )
    }

    /**
     * Обновление данных компании
     * @param dto
     */
    update(dto: UpdateCompanyDto) {
        return from(this.companyRepository.findOne({ id: dto.id })).pipe(
            mergeMap(checkEntity(this.errorMessage)),
            mergeMap((company) => forkJoin([
                this.contactRepository.updateContact(dto.contact, company.id),
                this.userService.updateUserCompany(dto.users, company.id),
                this.requisitesService.update(dto.requisites, dto.id)
            ])),
            mergeMapTo(from(this.companyRepository.update({ id: dto.id }, { name: dto.name }))),
            mapTo({ message: 'Данные компании обновлены' }),
            catchServerError()
        );
    }

    /**
     * Получить все данные о компании для дальнейшего редактирования
     * @param id айди компании
     */
    getFullCompany(id: string) {
        return from(this.companyRepository.getFullCompany(id)).pipe(
            mergeMap(checkEntity(this.errorMessage)),
            map((company) => ({
                ...company,
                users: company.users.map(({ username }) => username)
            })),
            catchServerError()
        );
    }

    /**
     * Каскадное удаление компании со всеми зависимостями
     * @param companyId
     */
    remove(companyId: string) {
        return this.userService.removeUserCompany(companyId).pipe(
            mergeMap(() => from(this.companyRepository.delete(companyId))),
            mapTo({ message: 'Компания полностью удалена' }),
            catchServerError()
        );
    }
}
