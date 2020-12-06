import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Order } from '@order/entities/order.entity';
import { Good } from '@good/entities/good.entity';

@Entity()
export class Quantity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'integer' })
    qty!: number;

    @ManyToOne(() => Good, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    good!: Good;

    @ManyToOne(() => Order, (order) => order.quantity, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    order!: Order;
}
