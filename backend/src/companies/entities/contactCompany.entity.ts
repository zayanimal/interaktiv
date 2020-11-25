import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { Companies } from '@companies/entities/companies.entity';

@Entity()
export class ContactCompany {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 35 })
    email: string;

    @Column({ type: 'varchar', length: 35 })
    phone: string;

    @Column({ type: 'varchar', length: 35 })
    website: string;

    @Column({ type: 'uuid' })
    companyId: string;

    @OneToOne(() => Companies, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    company: Companies
}
