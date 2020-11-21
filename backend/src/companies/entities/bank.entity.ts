import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { Requisites } from '@companies/entities/requisites.entity';

@Entity()
export class Bank {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 40,
        unique: true
    })
    name: string;

    @Column({ type: 'varchar', length: 50 })
    rs: string;

    @Column({ type: 'varchar', length: 50 })
    ks: string;

    @Column({ type: 'varchar', length: 20 })
    bik: string;

    @Column({ type: 'varchar', length: 60 })
    address: string;

    @ManyToOne(() => Requisites, (reqs) => reqs.bank)
    requisites: Requisites;
}
