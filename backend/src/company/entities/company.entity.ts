import {
    Entity,
    Column,
    JoinColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne
} from 'typeorm';
import { Users } from '@users/entities/users.entity';
import { Requisites } from '@company/requisites/entities/requisites.entity';
import { ContactCompany } from '@/company/entities/contact-company.entity';
import { Margin } from '@good/margin/entities/margin.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true
    })
    name!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    time!: string;

    @Column({ type: 'uuid', nullable: true })
    contactId!: string;

    @OneToOne(() => ContactCompany)
    @JoinColumn()
    contact!: ContactCompany;

    @OneToMany(() => Users, (users) => users.company)
    users!: Users[];

    @OneToMany(() => Requisites, (reqs) => reqs.company)
    requisites!: Requisites[];

    @OneToMany(() => Margin, (margin) => margin.company)
    margin!: Margin;

    set(props: object) { return Object.assign(this.contact, props); }
}
