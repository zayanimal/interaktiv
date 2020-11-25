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
        unique: true,
        nullable: false
    })
    name: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    rs: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    ks: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    bik: string;

    @Column({ type: 'varchar', length: 60, nullable: false })
    address: string;

    @Column({ type: 'uuid' })
    requisitesId: string;

    @ManyToOne(() => Requisites, (reqs) => reqs.bank)
    requisites: Requisites;
}
