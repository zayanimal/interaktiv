import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Generated,
    ManyToMany,
    ManyToOne,
    JoinColumn,
    JoinTable,
    OneToMany
} from 'typeorm';
import { Users } from '@users/entities/users.entity';
import { Company } from '@company/entities/company.entity';
import { Enduser } from '@enduser/entities/enduser.entity';
import { OrderStatus } from '@order/order-status/entities/order-status.entity';
import { Good } from '@good/entities/good.entity';
import { Margin } from '@good/margin/entities/margin.entity';
import { Price } from '@good/price/entities/price.entity';
import { Discount } from '@good/discount/entities/discount.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Generated('rowid')
    @Column()
    orderId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created!: string;

    @ManyToOne(() => Users)
    user!: Users;

    @ManyToOne(() => Company)
    company!: Company;

    @ManyToOne(() => Enduser)
    enduser!: Enduser;

    @ManyToMany(() => Good)
    @JoinTable()
    good!: Good[];

    @ManyToMany(() => Price)
    @JoinTable()
    price!: Price[];

    @OneToMany(() => Discount, (discount) => discount.order)
    discount!: Discount[];

    @OneToMany(() => Margin, (margin) => margin.order)
    margin!: Margin[];

    @ManyToOne(() => OrderStatus, (status) => status.order)
    @JoinColumn()
    status!: OrderStatus;
}
