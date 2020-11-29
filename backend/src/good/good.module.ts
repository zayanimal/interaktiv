import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodService } from '@good/good.service';
import { GoodController } from '@good/good.controller';
import { PriceModule } from '@good/price/price.module';
import { MarginModule } from '@good/margin/margin.module';
import { DescriptionModule } from '@good/description/description.module';
import { DiscountModule } from '@good/discount/discount.module';
import { Good } from '@good/entities/good.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Good
    ]),
    PriceModule,
    MarginModule,
    DescriptionModule,
    DiscountModule
  ],
  providers: [GoodService],
  controllers: [GoodController]
})
export class GoodModule {}
