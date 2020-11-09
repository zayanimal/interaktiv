import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from './roles.entity';
import { Permissions } from './permissions.entity';

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

    @Column({ type: 'uuid', default: '586ecc04-b76f-42a3-9986-1ddb4c97d3ff' })
    rolesId: string;

    @ManyToOne(() => Roles)
    @JoinColumn()
    roles: Roles;

    @ManyToMany(() => Permissions, { eager: true, cascade: true })
    @JoinTable()
    permissions: Permissions[];

    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
