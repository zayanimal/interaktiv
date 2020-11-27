import { Test, TestingModule } from '@nestjs/testing';
import { RequisitesService } from './requisites.service';

describe('RequisitesService', () => {
  let service: RequisitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequisitesService],
    }).compile();

    service = module.get<RequisitesService>(RequisitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
