import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from './roles.entity';

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

    @ManyToOne(() => Roles, (roles) => roles.users)
    @JoinColumn()
    roles: Roles

    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
