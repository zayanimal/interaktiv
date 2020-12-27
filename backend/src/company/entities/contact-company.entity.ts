import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { Company } from '@company/entities/company.entity';

@Entity()
export class ContactCompany {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 35 })
    email!: string;

    @Column({ type: 'varchar', length: 35 })
    phone!: string;

    @Column({ type: 'varchar', length: 35 })
    website!: string;

    @Column({ type: 'uuid' })
    companyId!: string;

    @OneToOne(() => Company, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    company!: Company;

    setId(id: string) {
        this.id = id;

        return this;
    }
}
