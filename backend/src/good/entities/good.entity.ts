import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { Price } from '@good/price/entities/price.entity';
import { Discount } from '@good/discount/entities/discount.entity';
import { Margin } from '@good/margin/entities/margin.entity';
import { Quantity } from '@good/quantity/entities/quantity.entity';
import { Description } from '@good/description/entities/description.entity';

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
    @JoinColumn()
    description!: Description;

    @OneToMany(() => Price, (price) => price.good)
    price!: Price[];

    @OneToMany(() => Discount, (discount) => discount.good)
    discount!: Discount[];

    @OneToMany(() => Margin, (margin) => margin.good)
    margin!: Margin[];

    @OneToMany(() => Quantity, (quantity) => quantity.good)
    quantity!: Quantity[];

    setDescription(description: Description) {
        this.description = description;

        return this;
    }

    setDublicate() {
        this.name = `${this.name}_dub`;

        return this;
    }
}
