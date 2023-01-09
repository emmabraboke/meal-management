import { Test, TestingModule } from '@nestjs/testing';
import { AddonsService } from './addons.service';

jest.mock('./addons.service');

describe('BrandService', () => {
  let service: AddonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddonsService],
    }).compile();

    service = module.get<AddonsService>(AddonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
