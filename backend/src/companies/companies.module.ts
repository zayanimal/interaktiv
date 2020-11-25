import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from '@companies/companies.controller';
import { CompaniesService } from '@companies/companies.service';
import { Companies } from '@companies/entities/companies.entity';
import { Requisites } from '@companies/entities/requisites.entity';
import { Bank } from '@companies/entities/bank.entity';
import { Users } from '@users/entities/users.entity';
import { ContactCompany } from '@companies/entities/contactCompany.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Companies,
    Requisites,
    Bank,
    Users,
    ContactCompany
  ])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService]
})
export class CompaniesModule {}
