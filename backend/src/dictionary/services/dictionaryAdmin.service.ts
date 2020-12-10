import { Observable, from, throwError, forkJoin } from 'rxjs';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import {
    Injectable,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { AdminDictionaries } from '@dictionary/entities/adminDicts.entity';
import { AdminDictDto } from '@dictionary/dto/adminDict.dto';
import { checkEntity } from '@shared/utils';

@Injectable()
export class DictionaryAdminService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        @InjectRepository(AdminDictionaries)
        private readonly adminDictsRepository: Repository<AdminDictionaries>
    ) {}

    getDictionary(dictionary: string) {
        return this.entityManager.query(`select * from ${dictionary}`);
    }

    getAdminDictinaries({ dicts }: AdminDictDto): Observable<unknown> {
        return from(this.adminDictsRepository
            .createQueryBuilder('adminDictionaries')
            .where('adminDictionaries.name IN (:...name)', { name: dicts.split('%') })
            .getMany()).pipe(
                mergeMap((dicts) => forkJoin(dicts.reduce((acc, { name }) => {
                    Object.assign(acc, { [name]: from(this.getDictionary(name)) })

                    return acc;
                }, {}))),
                catchError((err) => throwError(new InternalServerErrorException(err.message)))
            );
    }

    createAdminDictionary(name: string) {
        return from(this.adminDictsRepository.findOne({ where: { name } })).pipe(
            mergeMap((dictionary) => (dictionary?.name ? throwError(
                new BadRequestException('Словарь уже существует')
            ) : from(this.adminDictsRepository.save(
                this.adminDictsRepository.create({ name })))
            ))
        );
    }

    removeAdminDictionary(name: string) {
        return from(this.adminDictsRepository.findOne({ where: { name } })).pipe(
            mergeMap(checkEntity('Словарь не существует')),
            switchMap((dictionary) => from(this.adminDictsRepository.remove(dictionary)).pipe(
                map(() => ({ message: `Словарь ${name} удалён` }))
            )),
            catchError(() => throwError(new NotFoundException(`Словарь ${name} не найден`)))
        );
    }
}
