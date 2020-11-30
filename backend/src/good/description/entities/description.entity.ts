import {
    Entity,
    Column,
    JoinColumn,
    PrimaryGeneratedColumn,
    OneToOne
} from 'typeorm';
import { Good } from '@good/entities/good.entity';

@Entity()
export class Description {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 20 })
    vendor!: string;

    @Column({ type: 'varchar', length: 2000 })
    description!: string;

    @OneToOne(() => Good, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    good!: Good;
}
