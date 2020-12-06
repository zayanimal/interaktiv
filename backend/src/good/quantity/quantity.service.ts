import { from } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quantity } from '@good/quantity/entities/quantity.entity';
import { QuantityDto } from '@good/quantity/dto/quantity.dto';

@Injectable()
export class QuantityService {
    constructor(
        @InjectRepository(Quantity)
        private readonly quantityRepository: Repository<Quantity>
    ) {}

    /**
     * Создать новое количество товара в заказе
     * @param dto
     */
    create(dto: QuantityDto) {
        return from(this.quantityRepository.save(
            this.quantityRepository.create(dto)
        ));
    }
}
