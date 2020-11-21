import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { Companies } from '@companies/entities/companies.entity';
import { Bank } from '@companies/entities/bank.entity';

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

    @OneToMany(() => Bank, (bank) => bank.requisites)
    bank: Bank[];

    @ManyToOne(() => Companies, (comp) => comp.requisites)
    companies: Companies;
}
