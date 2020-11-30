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
import { Roles } from '@auth/entities/roles.entity';
import { Permissions } from '@auth/entities/permissions.entity';
import { ContactUser } from '@users/entities/contactUser.entity';
import { Companies } from '@companies/entities/companies.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'varchar',
        length: 30,
        unique: true
    })
    username!: string;

    @Column({ type: 'varchar' })
    password!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    time!: string;

    @Column({ type: 'boolean', default: true })
    isActive!: boolean;

    @Column({ type: 'uuid', default: 'bbab9d8b-0bda-4f16-ae8d-59334e38a7c8' })
    rolesId!: string;

    @ManyToOne(() => Roles)
    @JoinColumn()
    roles!: Roles;

    @Column({ type: 'uuid', nullable: true })
    contactId!: string;

    @OneToOne(() => ContactUser)
    @JoinColumn()
    contact!: ContactUser;

    @Column({ type: 'uuid', nullable: true })
    companiesId!: string | null;

    @ManyToOne(() => Companies)
    @JoinColumn()
    companies!: Companies;

    @ManyToMany(() => Permissions)
    @JoinTable()
    permissions!: Permissions[];

    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
