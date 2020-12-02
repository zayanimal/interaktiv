import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Discount } from '@good/discount/entities/discount.entity';

@Entity()
export class Enduser {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 40 })
    name!: string;

    @Column({ type: 'varchar', length: 40 })
    city!: string;

    @OneToMany(() => Discount, (discount) => discount.enduser)
    discount!: Discount[];
}
