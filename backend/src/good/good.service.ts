import { Observable, of, from, throwError, forkJoin } from 'rxjs';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Good } from '@good/entities/good.entity';

@Injectable()
export class GoodService {
    constructor(
        @InjectRepository(Good)
        private readonly goodRepository: Repository<Good>
    ) {}
}
