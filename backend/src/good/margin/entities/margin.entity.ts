import {
    Entity,
    Column,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { Good } from '@good/entities/good.entity';
import { Company } from '@company/entities/company.entity';
import { Order } from '@order/entities/order.entity';

@Entity()
export class Margin {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'real' })
    margin!: number;

    @ManyToOne(() => Good, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    good!: Good;

    @ManyToOne(() => Company, (company) => company.margin, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    company!: Company;

    @ManyToOne(() => Order, (order) => order.discount, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    order!: Order;
}
