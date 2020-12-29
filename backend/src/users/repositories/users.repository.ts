import { from } from 'rxjs';
import { map, mapTo, mergeMap, switchMapTo, switchMap, mergeMapTo } from 'rxjs/operators';
import { Repository, EntityRepository, Raw } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Users } from '@users/entities/users.entity';
import { checkEntity } from '@shared/utils';
import { UsersEntity, LIST_GROUP, FIND_GROUP,EDIT_GROUP } from '@users/users.serializer';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
    errorMessage: string = 'Пользователь не существует';

    private dbRequest(username: string) {
        return {
            where: { username },
            relations: ['role', 'permissions']
        };
    }

    list() {
        return this.createQueryBuilder('u')
            .select([
                'u.id',
                'u.username',
                'r.name',
                'u.time',
                'u.isActive'
            ])
            .leftJoin('u.role', 'r', 'u.roleId = r.id')
            .orderBy('u.time', 'ASC')
    }

    edit(username: string) {
        return from(this.createQueryBuilder('u')
            .select([
                'u.username',
                'u.isActive',
                'r.name',
                'p.name',
                'c.email',
                'c.phone',
                'c.position'
            ])
            .innerJoin('u.role', 'r')
            .innerJoin('u.permissions', 'p')
            .innerJoin('u.contacts', 'c')
            .where('u.username = :name', { name: username })
            .getOne()).pipe(
                mergeMap(checkEntity(this.errorMessage)),
                map((user) => this.transform(user, EDIT_GROUP))
            )
    }

    search(username: string) {
        return from(this.find({
            username: Raw((col) => `to_tsvector(${col}) @@ to_tsquery('${username}:*')`)
        }));
    }

    searchRaw(username: string) {
        return from(this.findOne(this.dbRequest(username))).pipe(
            mergeMap(checkEntity(this.errorMessage))
        );
    }

    searchId(id: string) {
        return from(this.findOne({id})).pipe(
            mergeMap(checkEntity(this.errorMessage))
        )
    }

    searchName(username: string) {
        return from(this.findOne(this.dbRequest(username))).pipe(
            mergeMap(checkEntity(this.errorMessage)),
            map((user) => this.transform(user, FIND_GROUP))
        );
    }

    removeUser(username: string) {
        return from(this.findOne({ username })).pipe(
            mergeMap(checkEntity(this.errorMessage)),
            switchMap((user) => from(this.remove(user)).pipe(
                mapTo({ message: `Пользователь ${username} удалён` })
            ))
        );
    }

    updateUserCompany(users: string[], companyId: string) {
        return from(this.find({ companyId })).pipe(
            mergeMap((usrs) => (usrs.length
                ? from(usrs).pipe(
                    mergeMap(({ username }) => this.update({ username }, { companyId: null })),
                    switchMapTo(from(users))
                )
                : from(users)
            )),
            mergeMap((username) => this.update({ username }, { companyId }))
        );
    }

    removeUserCompany(companyId: string) {
        return from(this.update({ companyId }, { companyId: null }));
    }

    transform(users: Users | Users[], options?: object) {
        return plainToClass(UsersEntity, users, options);
    }

    transformList(users: Users[]) {
        return this.transform(users, LIST_GROUP);
    }
}
