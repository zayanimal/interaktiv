import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Contacts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 30 })
    email: string;

    @Column({ type: 'varchar', length: 30 })
    phone: string;

    @Column({ type: 'varchar', length: 30 })
    position: string;
}
