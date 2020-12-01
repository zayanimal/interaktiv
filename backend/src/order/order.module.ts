import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from '@order/order.service';
import { OrderController } from '@order/order.controller';
import { OrderStatusModule } from '@order/order-status/order-status.module';
import { Order } from '@order/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order
    ]),
    OrderStatusModule
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
