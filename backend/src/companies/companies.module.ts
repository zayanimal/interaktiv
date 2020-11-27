import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from '@companies/companies.controller';
import { CompaniesService } from '@companies/services/companies.service';
import { ContactService } from '@companies/services/contact.service';
import { Companies } from '@companies/entities/companies.entity';
import { Users } from '@users/entities/users.entity';
import { ContactCompany } from '@companies/entities/contactCompany.entity';
import { UsersModule } from '@users/users.module';
import { RequisitesModule } from '@companies/requisites/requisites.module';
import { BankModule } from './bank/bank.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Companies,
      Users,
      ContactCompany
    ]),
    UsersModule,
    RequisitesModule,
    BankModule
  ],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    ContactService
  ],
  exports: [CompaniesService]
})
export class CompaniesModule {}
