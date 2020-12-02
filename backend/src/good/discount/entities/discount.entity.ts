import {
    Entity,
    Column,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { Good } from '@good/entities/good.entity';
import { Enduser } from '@enduser/entities/enduser.entity';

@Entity()
export class Discount {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'real' })
    discount!: number;

    @ManyToOne(() => Good, { cascade: true, onDelete: 'CASCADE' })
    good!: Good;

    @ManyToOne(() => Enduser, (enduser) => enduser.discount, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    enduser!: Enduser;
}
