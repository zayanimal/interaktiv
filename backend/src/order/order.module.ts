import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from '@order/order.service';
import { OrderController } from '@order/order.controller';
import { OrderStatusModule } from '@order/order-status/order-status.module';
import { DiscountModule } from '@good/discount/discount.module';
import { MarginModule } from '@good/margin/margin.module';
import { EnduserModule } from '@enduser/enduser.module';
import { Order } from '@order/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order
    ]),
    DiscountModule,
    MarginModule,
    EnduserModule,
    OrderStatusModule
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
