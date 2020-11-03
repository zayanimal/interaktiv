import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    OneToOne,
    JoinColumn
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

    @OneToOne(() => Roles)
    @JoinColumn()
    roles: Roles

    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
