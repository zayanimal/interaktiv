import { of, from, throwError, forkJoin } from 'rxjs';
import { map, mapTo, mergeMap, mergeMapTo, tap } from 'rxjs/operators';
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
            ))
        );
    }

    /**
     * Создать новую компания со всеми зависимостями
     * @param dto
     */
    create(dto: CreateCompanyDto) {
        return from(this.companyRepository.findOne({
            where: { name: dto.name }
        })).pipe(
            mergeMap((check) => this.checkCreateCompany(check, dto)),
            mergeMap((newCompany) => forkJoin([
                this.userService.updateUserCompany(dto.users, newCompany.id),
                this.contactRepository.createContact(dto.contact, newCompany.id),
                this.requisitesService.create(dto.requisites, newCompany.id),
                of(newCompany.id)
            ])),
            mergeMap(([_, contact, requisites, id]) => {
                return from(this.companyRepository.findOne({ where: { id }})).pipe(
                    mergeMap(checkEntity(this.errorMessage)),
                    mergeMap((company) => from(
                        this.companyRepository.save(company.set({ contact, requisites }))
                    ))
                );
            })
        )
    }

    /**
     * Обновление данных компании
     * @param dto
     */
    update({ id, ...dto }: UpdateCompanyDto) {
        return from(this.companyRepository.findOne({ id })).pipe(
            mergeMap(checkEntity(this.errorMessage)),
            mergeMap(({ id }) => forkJoin([
                this.contactRepository.updateContact(dto.contact, id),
                this.userService.updateUserCompany(dto.users, id),
                this.requisitesService.update(dto.requisites, id)
            ])),
            mergeMapTo(from(this.companyRepository.update(id, { name: dto.name }))),
            mapTo({ message: 'Данные компании обновлены' })
        );
    }

    /**
     * Получить все данные о компании для дальнейшего редактирования
     * @param id айди компании
     */
    getFullCompany(id: string) { return this.companyRepository.getFullCompany(id); }

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
