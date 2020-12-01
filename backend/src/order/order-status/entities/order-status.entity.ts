import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Order } from '@order/entities/order.entity';

@Entity()
export class OrderStatus {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'integer' })
    status!: number;

    @OneToMany(() => Order, (order) => order.status)
    order!: Order[];
}
