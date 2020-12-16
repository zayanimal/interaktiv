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
import { ContactUser } from '@users/entities/contact-user.entity';
import { Company } from '@company/entities/company.entity';
import { IUsersEntity } from '@users/interfaces/users-entity.interface';

@Entity()
export class Users implements IUsersEntity {
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
    roleId!: string;

    @ManyToOne(() => Roles)
    @JoinColumn()
    role!: Roles;

    @Column({ type: 'uuid', nullable: true })
    contactsId!: string;

    @OneToOne(() => ContactUser)
    @JoinColumn()
    contacts!: ContactUser;

    @Column({ type: 'uuid', nullable: true })
    companyId!: string | null;

    @ManyToOne(() => Company)
    @JoinColumn()
    company!: Company;

    @ManyToMany(() => Permissions)
    @JoinTable()
    permissions!: Permissions[];

    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
