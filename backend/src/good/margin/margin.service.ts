import { from } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Margin } from '@good/margin/entities/margin.entity';
import { MarginDto } from '@good/margin/dto/margin.dto';

@Injectable()
export class MarginService {
    constructor(
        @InjectRepository(Margin)
        private readonly marginRepository: Repository<Margin>
    ) {}

    /**
     * Создать уровень прибыли для товара
     * @param margin
     */
    create(dto: MarginDto) {
        return from(this.marginRepository.save(
            this.marginRepository.create(dto)
        ));
    }
}
