import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Users } from '@users/entities/users.entity';
import { Requisites } from '@companies/entities/requisites.entity';

@Entity()
export class Companies {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true
    })
    name: string;

    @Column({ type: 'varchar', length: 30 })
    email: string;

    @Column({ type: 'varchar', length: 20 })
    phone: string;

    @Column({ type: 'varchar', length: 30 })
    site: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    time: string;

    @OneToMany(() => Users, users => users.companies)
    users: Users[];

    @OneToMany(() => Requisites, reqs => reqs.companies)
    requisites: Requisites[];
}
