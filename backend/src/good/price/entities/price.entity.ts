import {
    Entity,
    Column,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { Good } from '@good/entities/good.entity';

@Entity()
export class Price {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    date!: string;

    @Column({ type: 'real' })
    cost!: number;

    @ManyToOne(() => Good, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    good!: Good;
}
