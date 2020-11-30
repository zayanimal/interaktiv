import { Observable, from, of, throwError, forkJoin } from 'rxjs';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { AdminDictionaries } from '@dictionary/entities/adminDicts.entity';
import { AdminDictDto } from '@dictionary/dto/adminDict.dto';

@Injectable()
export class DictionaryAdminService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        @InjectRepository(AdminDictionaries)
        private readonly adminDictsRepository: Repository<AdminDictionaries>
    ) {}

    checkDictionary(dict: AdminDictionaries | undefined) {
        return (dict
            ? of(dict)
            : throwError(
                new HttpException('Словарь не существует', HttpStatus.BAD_REQUEST)
            )
        );
    }

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


                catchError((err) => throwError(
                    new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
                ))
            );
    }

    createAdminDictionary(name: string) {
        return from(this.adminDictsRepository.findOne({ where: { name } })).pipe(
            mergeMap((dictionary) => {
                if (dictionary?.name) {
                    return throwError(
                        new HttpException('Словарь уже существует', HttpStatus.BAD_REQUEST)
                    );
                }

                return from(this.adminDictsRepository.save(
                    this.adminDictsRepository.create({ name })
                ));
            })
        );
    }

    removeAdminDictionary(name: string) {
        return from(this.adminDictsRepository.findOne({ where: { name } })).pipe(
            mergeMap((dict) => this.checkDictionary(dict)),
            switchMap((dictionary) => from(this.adminDictsRepository.remove(dictionary)).pipe(
                map(() => ({ message: `Словарь ${name} удалён` }))
            )),

            catchError(() => throwError(
                new HttpException(
                    `Словарь ${name} не найден`,
                    HttpStatus.BAD_REQUEST
                )
            ))
        );
    }
}
