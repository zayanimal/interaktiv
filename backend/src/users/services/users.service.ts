import { of, from, throwError, forkJoin } from 'rxjs';
import { map, mergeMap, catchError, mapTo } from 'rxjs/operators';
import { Injectable, Inject, forwardRef, InternalServerErrorException } from '@nestjs/common';
import { checkEntity } from '@shared/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { hash } from 'bcrypt';
import { AuthService } from '@auth/auth.service';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UsersRepository } from '@users/repositories/users.repository';
import { ContactsRepository } from '../repositories/contacts.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,
        @InjectRepository(ContactsRepository)
        private readonly contactsRepository: ContactsRepository,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService
    ) {}

    search(username: string) {
        return this.usersRepository.search(username);
    }

    /**
     * Поиск пользователя по id
     * @param id
     */
    searchId(id: string) {
        return this.usersRepository.searchId(id);
    }

    /**
     * Пагинация юзеров общий список
     * @param page
     * @param limit
     */
    getUsers(page: number, limit: number) {
        return from(
            paginate(
                this.usersRepository.list(),
                { page, limit }
            )
        ).pipe(
            map(({ items, meta }) => ({
                items: this.usersRepository.transformList(items),
                meta
            })),

            catchError((err) => throwError(
                new InternalServerErrorException(err.message)
            ))
        );
    }

    /**
     * Найти пользователя в базе по имени
     * @param param имя пользователя
     */
    findByUsername(username: string) {
        return this.usersRepository.searchName(username);
    }

    /**
     * Найти пльзователя и его контакты, чтобы отредактировать
     * @param username
     */
    findUserForEdit(username: string) {
        return this.usersRepository.edit(username);
    }

    /**
     * Редактирование пользователя
     * @param editableUser имя редактируемого пользователя
     * @param userDto данные для редактирования
     */
    editUser(editableUser: string, userDto: CreateUserDto & { isActive: boolean; }) {
        const { username, password, isActive, role, permissions, contacts } = userDto;

        return forkJoin({
                user: this.usersRepository.searchRaw(editableUser),
                foundRole: from(this.authService.checkRole(role)),
                permissions: from(this.authService.checkPermissions(permissions)),
                hashedPassword: (password.length ? from(hash(password, 10)) : of(''))
            }).pipe(
            mergeMap((props) => {
                const { user, foundRole, permissions, hashedPassword } = props;

                user.username = username;
                if (hashedPassword.length) { user.password = hashedPassword; }
                user.isActive = isActive;
                user.role = foundRole;
                user.permissions = permissions;

                return from(this.usersRepository.save(user));
            }),
            mergeMap(({ id }) => from(
                this.contactsRepository.findOne({ where: { usersId: id }})
            ).pipe(
                mergeMap(checkEntity('Пользователь не существует')),
                mergeMap((contact) => {
                    const { email, phone, position } = contacts;

                    contact.email = email;
                    contact.phone = phone;
                    contact.position = position;

                    return from(this.contactsRepository.save(contact));
                }),
                mapTo({ message: `Пользователь изменён` })
            )),
            catchError((err) => of(err.message))
        );
    }

    /**
     * Удалить пользователя
     * @param username
     */
    removeUser(username: string) {
        return this.usersRepository.removeUser(username);
    }

    /**
     * Обновить в пользователе его принадлежность к организации
     * @param users список пользователей
     * @param id айди компании
     */
    updateUserCompany(users: string[], id: string) {
        return this.usersRepository.updateUserCompany(users, id);
    }

    /**
     * Удалить пользователя в компании
     * @param companyId
     */
    removeUserCompany(companyId: string) {
        return this.usersRepository.removeUserCompany(companyId);
    }
}
