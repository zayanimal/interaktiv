import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequisitesController } from '@company/requisites/requisites.controller';
import { RequisitesService } from '@company/requisites/requisites.service';
import { Requisites } from '@company/requisites/entities/requisites.entity';
import { BankModule } from '@company/bank/bank.module';

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
