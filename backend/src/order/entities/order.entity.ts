import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Generated,
    ManyToMany,
    OneToOne,
    ManyToOne,
    JoinColumn,
    JoinTable,
    OneToMany
} from 'typeorm';
import { Users } from '@users/entities/users.entity';
import { Company } from '@company/entities/company.entity';
import { Enduser } from '@enduser/entities/enduser.entity';
import { Good } from '@good/entities/good.entity';
import { OrderStatus } from '@order/order-status/entities/order-status.entity';
import { Discount } from '@good/discount/entities/discount.entity';
import { Margin } from '@good/margin/entities/margin.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Generated('rowid')
    @Column()
    orderId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created!: string;

    @OneToOne(() => Users)
    @JoinColumn()
    user!: Users;

    @ManyToOne(() => Company)
    @JoinColumn()
    company!: Company;

    @ManyToOne(() => Enduser)
    @JoinColumn()
    enduser!: Enduser;

    @ManyToMany(() => Good, { eager: true })
    @JoinTable()
    good!: Good[];

    @OneToMany(() => Discount, (discount) => discount.order)
    discount!: Discount[];

    @OneToMany(() => Margin, (margin) => margin.order)
    margin!: Margin[];

    @ManyToOne(() => OrderStatus, (status) => status.order)
    @JoinColumn()
    status!: OrderStatus;
}
