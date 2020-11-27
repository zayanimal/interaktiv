import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequisitesController } from '@companies/requisites/requisites.controller';
import { RequisitesService } from '@companies/requisites/requisites.service';
import { Requisites } from '@companies/entities/requisites.entity';
import { BankModule } from '@companies/bank/bank.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Requisites]),
    BankModule
  ],
  controllers: [RequisitesController],
  providers: [RequisitesService],
  exports: [RequisitesService]
})
export class RequisitesModule {}
