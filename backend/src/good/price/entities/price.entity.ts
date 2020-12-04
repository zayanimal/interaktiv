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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date!: string;

    @Column({ type: 'real' })
    cost!: number;

    @Column({ type: 'uuid' })
    goodId!: string;

    @ManyToOne(() => Good, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    good!: Good;
}
