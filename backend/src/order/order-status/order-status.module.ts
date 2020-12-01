import { Module } from '@nestjs/common';
import { OrderStatusService } from '@order/order-status/order-status.service';

@Module({
  providers: [OrderStatusService],
  exports: [OrderStatusService]
})
export class OrderStatusModule {}
