import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from '@company/company.controller';
import { CompanyService } from '@company/company.service';
import { UsersModule } from '@users/users.module';
import { RequisitesModule } from '@company/requisites/requisites.module';
import { BankModule } from '@company/bank/bank.module';
import { UsersRepository } from '@users/repositories/users.repository';
import { CompanyRepository, ContactRepository } from '@company/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyRepository,
      ContactRepository,
      UsersRepository,
    ]),
    UsersModule,
    RequisitesModule,
    BankModule
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService]
})
export class CompanyModule {}
