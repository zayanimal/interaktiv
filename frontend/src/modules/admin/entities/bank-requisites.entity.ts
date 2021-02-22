import { IsNotEmpty } from 'class-validator';
import { ValidationEntity } from '@shared/entities';

export class BankRequisitesEntity extends ValidationEntity {
    constructor(id?: string) {
        super();

        if (id) {
            this.id = id;
        }
    }

    @IsNotEmpty({ message: 'Необходимо указать название банка' })
    name = '';

    @IsNotEmpty({ message: 'Необходимо указать расчётный счёт' })
    rs = '';

    @IsNotEmpty({ message: 'Необходимо указать корреспондентский счёт' })
    ks = '';

    @IsNotEmpty({ message: 'Необходимо указать БИК' })
    bik = '';

    @IsNotEmpty({ message: 'Необходимо указать адрес банка' })
    address = '';
}
