import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusService } from '@order/order-status/order-status.service';
import { OrderStatus } from '@order/order-status/entities/order-status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderStatus
    ])
  ],
  providers: [OrderStatusService],
  exports: [OrderStatusService]
})
export class OrderStatusModule {}
