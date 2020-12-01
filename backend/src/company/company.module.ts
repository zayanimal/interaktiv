import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from '@company/company.controller';
import { CompanyService } from '@company/company.service';
import { Company } from '@company/entities/company.entity';
import { Users } from '@users/entities/users.entity';
import { ContactCompany } from '@company/contact-company/entities/contact-company.entity';
import { UsersModule } from '@users/users.module';
import { RequisitesModule } from '@company/requisites/requisites.module';
import { BankModule } from '@company/bank/bank.module';
import { ContactCompanyModule } from '@company/contact-company/contact-company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      Users,
      ContactCompany
    ]),
    UsersModule,
    RequisitesModule,
    BankModule,
    ContactCompanyModule
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService]
})
export class CompanyModule {}
