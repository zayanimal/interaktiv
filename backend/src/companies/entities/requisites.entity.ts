import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { Companies } from '@companies/entities/companies.entity';
import { Bank } from '@companies/entities/bank.entity';

@Entity()
export class Requisites {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'varchar',
        length: 40,
        nullable: false
    })
    name!: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    inn!: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    kpp!: string;

    @Column({ type: 'varchar', length: 40, nullable: false })
    ogrn!: string;

    @OneToMany(() => Bank, (bank) => bank.requisites)
    bank!: Bank[];

    @Column({ type: 'uuid' })
    companiesId!: string;

    @ManyToOne(
        () => Companies,
        (comp) => comp.requisites,
        { cascade: true, onDelete: 'CASCADE' }
    )
    companies!: Companies;
}
