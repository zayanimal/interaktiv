import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToOne
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from './roles.entity';
import { Permissions } from './permissions.entity';
import { Contacts } from './contacts.entity';
import { Companies } from '@companies/entities/companies.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 30,
        unique: true
    })
    username: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    time: string;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @Column({ type: 'uuid', default: 'bbab9d8b-0bda-4f16-ae8d-59334e38a7c8' })
    rolesId: string;

    @ManyToOne(() => Roles)
    @JoinColumn()
    roles: Roles;

    @ManyToMany(() => Permissions, { eager: true })
    @JoinTable()
    permissions: Permissions[];

    @OneToOne(() => Contacts)
    @JoinColumn()
    contacts: Contacts

    @ManyToOne(() => Companies)
    @JoinColumn()
    companies: Companies

    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
