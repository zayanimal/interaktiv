import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { Companies } from './entities/companies.entity';
import { Requisites } from './entities/requisites.entity';
import { Bank } from './entities/bank.entity';
import { Users } from '@users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Companies,
    Requisites,
    Bank,
    Users
  ])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService]
})
export class CompaniesModule {}
