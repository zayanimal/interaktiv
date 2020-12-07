import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from '@order/order.service';
import { OrderController } from '@order/order.controller';
import { OrderStatusModule } from '@order/order-status/order-status.module';
import { UsersModule } from '@users/users.module';
import { CompanyModule } from '@company/company.module';
import { GoodModule } from '@good/good.module';
import { PriceModule } from '@good/price/price.module';
import { DiscountModule } from '@good/discount/discount.module';
import { MarginModule } from '@good/margin/margin.module';
import { QuantityModule } from '@good/quantity/quantity.module';
import { EnduserModule } from '@enduser/enduser.module';
import { OrderRepository } from '@order/order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository
    ]),
    UsersModule,
    CompanyModule,
    GoodModule,
    PriceModule,
    DiscountModule,
    MarginModule,
    QuantityModule,
    EnduserModule,
    OrderStatusModule
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
