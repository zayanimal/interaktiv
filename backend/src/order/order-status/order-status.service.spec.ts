import { Test, TestingModule } from '@nestjs/testing';
import { OrderStatusService } from '@order/order-status/order-status.service';

describe('StatusService', () => {
  let service: OrderStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderStatusService],
    }).compile();

    service = module.get<OrderStatusService>(OrderStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
