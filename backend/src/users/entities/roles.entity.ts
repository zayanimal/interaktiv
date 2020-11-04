import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Roles {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 30,
        unique: true
    })
    name: string;

    @OneToMany(() => Users, (users) => users.roles)
    users: Users;
}
