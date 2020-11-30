import { Observable, of, from, throwError, forkJoin } from 'rxjs';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { hash } from 'bcrypt';
import { AuthService } from '@auth/auth.service';
import { ContactsService } from '@users/services/contacts.service';
import { UserDto } from '@users/dto/user.dto';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { Users } from '@users/entities/users.entity';
import { ContactUser } from '@users/entities/contactUser.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(ContactUser)
        private readonly contactsRepository: Repository<ContactUser>,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService,
        private contactService: ContactsService
    ) {}

    dbRequest(username: string) {
        return {
            where: { username },
            relations: ['roles', 'permissions']
        };
    }

    /**
     * Пагинация юзеров общий список
     * @param page
     * @param limit
     */
    getUsers(page: number, limit: number): Observable<
        Omit<Pagination<Omit<UserDto, 'permissions'>>, 'links'>
    > {
        return from(
            paginate(this.usersRepository
                .createQueryBuilder('users')
                .select([
                    'users.id',
                    'users.username',
                    'r.name',
                    'users.time',
                    'users.isActive',
                ])
                .leftJoin('users.roles', 'r', 'users.rolesId = r.id')
                .orderBy('users.time', 'ASC'),
                { page, limit }
            )
        ).pipe(
            map(({ items, meta }) => ({
                items: items.map((user) => ({
                    username: user.username,
                    time: user.time,
                    isActive: user.isActive,
                    role: user.roles.name
                })),
                meta
            })),

            catchError((err) => throwError(
                new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            ))
        );
    }

    /**
     * Найти пользователя в базе по имени
     * @param param имя пользователя
     */
    findByUsername(username: string): Observable<UserDto> {
        return from(this.usersRepository.findOne(this.dbRequest(username))).pipe(
            mergeMap((user) => (user
                ? of(user).pipe(
                    map((user) => ({
                        username: user.username,
                        role: user.roles.name,
                        isActive: user.isActive,
                        permissions: user.permissions.map(({ name }) => name)
                    }))
                )
                : throwError(
                    new HttpException('Пользователь не существует', HttpStatus.UNAUTHORIZED)
                )
            ))
        );
    }

    /**
     * Найти пльзователя и его контакты, чтобы отредактировать
     * @param username
     */
    findUserForEdit(username: string) {
        return from(this.usersRepository
            .createQueryBuilder('users')
            .select([
                'users.username',
                'users.isActive',
                'rol.name',
                'perm.name',
                'cont.email',
                'cont.phone',
                'cont.position'
            ])
            .innerJoin('users.roles', 'rol')
            .innerJoin('users.permissions', 'perm')
            .innerJoin('users.contacts', 'cont')
            .where('users.username = :name', { name: username })
            .getOne()).pipe(
                mergeMap((user) => (user
                    ? of({
                        username: user.username,
                        isActive: user.isActive,
                        role: user.roles.name,
                        permissions: user.permissions.map(({ name }) => name),
                        contacts: user.contact
                    })
                    : throwError(new HttpException('Пользователь не существует', HttpStatus.UNAUTHORIZED))
                ))
            );
    }

    /**
     * Редактирование пользователя
     * @param editableUser имя редактируемого пользователя
     * @param userDto данные для редактирования
     */
    editUser(editableUser: string, userDto: CreateUserDto & { isActive: boolean; }) {
        const { username, password, isActive, role, permissions, contacts } = userDto;

        return forkJoin({
                user: from(this.usersRepository.findOne(this.dbRequest(editableUser))).pipe(
                    mergeMap((user) => this.authService.checkUserExistance(user))
                ),
                foundRole: from(this.authService.checkRole(role)),
                permissions: from(this.authService.checkPermissions(permissions)),
                hashedPassword: (password.length ? from(hash(password, 10)) : of(''))
            }).pipe(
            mergeMap((props) => {
                const { user, foundRole, permissions, hashedPassword } = props;

                user.username = username;
                if (hashedPassword.length) { user.password = hashedPassword; }
                user.isActive = isActive;
                user.roles = foundRole;
                user.permissions = permissions;

                return from(this.usersRepository.save(user));
            }),
            mergeMap(({ id }) => from(
                this.contactsRepository.findOne({ where: { usersId: id }})
            ).pipe(
                mergeMap((cntct) => this.contactService.checkContact(cntct)),
                mergeMap((contact) => {
                    const { email, phone, position } = contacts;

                    contact.email = email;
                    contact.phone = phone;
                    contact.position = position;

                    return from(this.contactsRepository.save(contact));
                }),
                map(() => ({ message: `Пользователь изменён` }))
            )),
            catchError((err) => of(err.message))
        );
    }

    /**
     * Удалить пользователя
     * @param userName
     */
    removeUser(username: string) {
        return from(this.usersRepository.findOne({ where: { username } })).pipe(
            mergeMap((user) => this.authService.checkUserExistance(user)),
            switchMap((user) => from(this.usersRepository.remove(user)).pipe(
                map(() => ({ message: `Пользователь ${username} удалён` }))
            )),

            catchError(() => throwError(
                new HttpException(
                    `Пользователь ${username} не найден`,
                    HttpStatus.BAD_REQUEST
                )
            ))
        );
    }

    /**
     * Обновить в пользователе его принадлежность к организации
     * @param users список пользователей
     * @param id айди компании
     */
    updateUserCompany(users: string[], id: string) {
        return from(this.usersRepository.find({
            where: users.map((username) => ({ username }))
        })).pipe(
            mergeMap((users) => from(users)),
            mergeMap((user) => from(this.usersRepository.update(
                { username: user.username },
                { companiesId: id }
            )))
        );
    }

    /**
     * Удалить пользователя в компании
     * @param companiesId
     */
    removeUserCompany(companiesId: string) {
        return from(this.usersRepository.update({ companiesId }, { companiesId: null }));
    }
}
