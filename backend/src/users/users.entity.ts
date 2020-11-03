import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

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


    @Column({ type: 'uuid' })
    role_id: string;

    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
