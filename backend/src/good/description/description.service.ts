import { from } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Description } from '@good/description/entities/description.entity';
import { ICreate } from '@good/description/interfaces/create.interface';

@Injectable()
export class DescriptionService {
    constructor(
        @InjectRepository(Description)
        private readonly descriptionRepository: Repository<Description>
    ) {}

    /**
     * Создать описание и вендора товара
     * @param description
     * @param vendor
     */
    create(data: ICreate) {
        return from(this.descriptionRepository.save(
            this.descriptionRepository.create(data)
        ));
    }
}
