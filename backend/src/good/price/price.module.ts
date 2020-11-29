import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceService } from './price.service';
import { Price } from '@good/price/entities/price.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Price
    ])
  ],
  providers: [PriceService],
  exports: [PriceService]
})
export class PriceModule {}
