import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankController } from '@companies/bank/bank.controller';
import { BankService } from '@companies/bank/bank.service';
import { Bank } from '@companies/entities/bank.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bank])
  ],
  controllers: [BankController],
  providers: [BankService],
  exports: [BankService]
})
export class BankModule {}
