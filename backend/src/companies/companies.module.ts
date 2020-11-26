import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from '@companies/companies.controller';
import { CompaniesService } from '@companies/services/companies.service';
import { BankService } from '@companies/services/bank.service'
import { ContactService } from '@companies/services/contact.service';
import { RequisitesService } from '@companies/services/requisites.service';
import { Companies } from '@companies/entities/companies.entity';
import { Requisites } from '@companies/entities/requisites.entity';
import { Bank } from '@companies/entities/bank.entity';
import { Users } from '@users/entities/users.entity';
import { ContactCompany } from '@companies/entities/contactCompany.entity';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      Companies,
      Requisites,
      Bank,
      Users,
      ContactCompany
    ])
  ],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    BankService,
    ContactService,
    RequisitesService
  ],
  exports: [CompaniesService]
})
export class CompaniesModule {}
