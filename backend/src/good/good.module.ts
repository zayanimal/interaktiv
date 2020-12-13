import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodService } from '@good/good.service';
import { GoodController } from '@good/good.controller';
import { PriceModule } from '@good/price/price.module';
import { MarginModule } from '@good/margin/margin.module';
import { DescriptionModule } from '@good/description/description.module';
import { DiscountModule } from '@good/discount/discount.module';
import { GoodRepository } from '@good/good.repository';
import { QuantityModule } from './quantity/quantity.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GoodRepository
    ]),
    PriceModule,
    MarginModule,
    DescriptionModule,
    DiscountModule,
    QuantityModule
  ],
  providers: [GoodService],
  controllers: [GoodController],
  exports: [GoodService]
})
export class GoodModule {}
