import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Good } from '@good/entities/good.entity';

@Entity()
export class Type {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 50 })
    name!: number;

    @OneToMany(() => Good, (good) => good.type, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    good!: Good[];
}
