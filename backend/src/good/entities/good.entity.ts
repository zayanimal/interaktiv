import {
    Entity,
    Column,
    JoinColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    ManyToOne
} from 'typeorm';
import { Price } from '@good/price/entities/price.entity';
import { Discount } from '@good/discount/entities/discount.entity';
import { Margin } from '@good/margin/entities/margin.entity';
import { Description } from '@good/description/entities/description.entity';
import { Type } from '@good/type/entities/type.entity';

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

    @ManyToOne(() => Type, (type) => type.good)
    type!: Type;

    @OneToOne(() => Description)
    @JoinColumn()
    description!: Description;

    @OneToMany(() => Price, (price) => price.good)
    price!: Price[];

    @OneToMany(() => Discount, (discount) => discount.good)
    discount!: Discount[];

    @OneToMany(() => Margin, (margin) => margin.good)
    margin!: Margin[];
}
