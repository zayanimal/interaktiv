import {
    Entity,
    PrimaryGeneratedColumn,
    Generated,
    OneToMany,
    OneToOne,
    ManyToOne,
    JoinColumn
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
    orderId!: number;

    @OneToOne(() => Users)
    @JoinColumn()
    user!: Users;

    @OneToOne(() => Company)
    @JoinColumn()
    company!: Company;

    @OneToMany(() => Good, (good) => good.order)
    good!: Good[];

    @ManyToOne(() => OrderStatus, (status) => status.order)
    status!: OrderStatus;
}
