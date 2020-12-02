import { Observable, of, from, forkJoin, throwError } from 'rxjs';
import { filter, skip, map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enduser } from '@enduser/entities/enduser.entity';
import { EnduserDto } from '@enduser/dto/enduser.dto';

@Injectable()
export class EnduserService {
    constructor(
        @InjectRepository(Enduser)
        private readonly enduserRepository: Repository<Enduser>
    ) {}

    /**
     * Создать нового заказчик
     * @param dto
     */
    create(dto: EnduserDto) {
        return of(this.enduserRepository.create(dto)).pipe(
            mergeMap((enduser) => this.enduserRepository.save(enduser))
        );
    }

    /**
     * Проверить на существование и если не существует создать
     * @param dto
     */
    checkCreate(dto: EnduserDto) {
        return from(this.enduserRepository.findOne(dto)).pipe(
            mergeMap((enduser) => (enduser ? of(enduser) : this.create(dto)))
        );
    }
}
