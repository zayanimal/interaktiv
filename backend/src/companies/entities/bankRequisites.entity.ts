import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { Requisites } from '@companies/entities/requisites.entity';

@Entity()
export class BankRequisites {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 40,
        unique: true
    })
    name: string;

    @Column({ type: 'string', length: 50 })
    bankName: string;

    @Column({ type: 'string', length: 50 })
    rs: string;

    @Column({ type: 'string', length: 50 })
    ks: string;

    @Column({ type: 'string', length: 20 })
    bik: string;

    @Column({ type: 'string', length: 60 })
    address: string;

    @ManyToOne(() => Requisites, (reqs) => reqs.bankRequisites)
    requisites: Requisites;
}
