import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankController } from '@company/bank/bank.controller';
import { BankService } from '@company/bank/bank.service';
import { Bank } from '@company/bank/entities/bank.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bank])
  ],
  controllers: [BankController],
  providers: [BankService],
  exports: [BankService]
})
export class BankModule {}
