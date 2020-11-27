import { Test, TestingModule } from '@nestjs/testing';
import { RequisitesController } from './requisites.controller';

describe('RequisitesController', () => {
  let controller: RequisitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequisitesController],
    }).compile();

    controller = module.get<RequisitesController>(RequisitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
