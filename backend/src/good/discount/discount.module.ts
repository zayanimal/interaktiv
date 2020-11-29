import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountService } from '@good/discount/discount.service';
import { Discount } from '@good/discount/entities/discount.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Discount
    ])
  ],
  providers: [DiscountService],
  exports: [DiscountService]
})
export class DiscountModule {}
