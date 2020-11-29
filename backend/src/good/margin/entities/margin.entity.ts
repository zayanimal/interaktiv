import {
    Entity,
    Column,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { Good } from '@good/entities/good.entity';

@Entity()
export class Margin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'real' })
    margin: number;

    @ManyToOne(() => Good, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    good: Good;
}
