import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Generated,
    ManyToMany,
    OneToOne,
    ManyToOne,
    JoinColumn,
    JoinTable
} from 'typeorm';
import { Users } from '@users/entities/users.entity';
import { Company } from '@company/entities/company.entity';
import { Good } from '@good/entities/good.entity';
import { OrderStatus } from '@order/order-status/entities/order-status.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Generated('rowid')
    @Column()
    orderId!: number;

    @OneToOne(() => Users)
    @JoinColumn()
    user!: Users;

    @OneToOne(() => Company)
    @JoinColumn()
    company!: Company;

    @ManyToMany(() => Good, { eager: true })
    @JoinTable()
    good!: Good[];

    @ManyToOne(() => OrderStatus, (status) => status.order)
    status!: OrderStatus;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created!: string;
}
