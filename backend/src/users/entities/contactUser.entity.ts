import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { Users } from '@users/entities/users.entity';

@Entity()
export class ContactUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 30 })
    email: string;

    @Column({ type: 'varchar', length: 30 })
    phone: string;

    @Column({ type: 'varchar', length: 30 })
    position: string;

    @Column({ type: 'uuid' })
    usersId: string;

    @OneToOne(() => Users, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    users: Users
}
