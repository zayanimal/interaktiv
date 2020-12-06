import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from '@order/services/order.service';
import { CheckOrderService } from '@order/services/check-order.service';
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
import { Order } from '@order/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order
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
  providers: [OrderService, CheckOrderService],
  controllers: [OrderController]
})
export class OrderModule {}
