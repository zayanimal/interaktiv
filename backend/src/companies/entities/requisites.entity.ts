import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { Companies } from '@companies/entities/companies.entity';
import { BankRequisites } from '@companies/entities/bankRequisites.entity';

@Entity()
export class Requisites {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 40,
        unique: true
    })
    name: string;

    @Column({ type: 'varchar', length: 20 })
    inn: string;

    @Column({ type: 'varchar', length: 20 })
    kpp: string;

    @Column({ type: 'varchar', length: 40 })
    ogrn: string;

    @OneToMany(() => BankRequisites, (bankReqs) => bankReqs.requisites)
    bankRequisites: BankRequisites[];

    @ManyToOne(() => Companies, (comp) => comp.requisites)
    companies: Companies;
}
