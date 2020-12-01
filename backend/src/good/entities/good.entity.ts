import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    ManyToOne,
} from 'typeorm';
import { Price } from '@good/price/entities/price.entity';
import { Discount } from '@good/discount/entities/discount.entity';
import { Margin } from '@good/margin/entities/margin.entity';
import { Description } from '@good/description/entities/description.entity';
import { Order } from '@order/entities/order.entity';

@Entity()
export class Good {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'varchar',
        length: 30,
        unique: true
    })
    name!: string;

    @OneToOne(() => Description)
    description!: Description;

    @OneToMany(() => Price, (price) => price.good)
    price!: Price[];

    @OneToMany(() => Discount, (discount) => discount.good)
    discount!: Discount[];

    @OneToMany(() => Margin, (margin) => margin.good)
    margin!: Margin[];

    @ManyToOne(() => Order, (order) => order.good)
    order!: Order;
}
