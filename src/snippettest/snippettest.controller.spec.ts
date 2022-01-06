import { Test, TestingModule } from '@nestjs/testing';
import { SnippettestController } from './snippettest.controller';

describe('SnippettestController', () => {
  let controller: SnippettestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnippettestController],
    }).compile();

    controller = module.get<SnippettestController>(SnippettestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
