import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuantityService } from '@good/quantity/quantity.service';
import { Quantity } from '@good/quantity/entities/quantity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quantity
    ])
  ],
  providers: [QuantityService],
  exports: [QuantityService]
})
export class QuantityModule {}
