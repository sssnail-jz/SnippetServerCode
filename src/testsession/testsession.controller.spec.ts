import { Test, TestingModule } from '@nestjs/testing';
import { TestsessionController } from './testsession.controller';

describe('TestsessionController', () => {
  let controller: TestsessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestsessionController],
    }).compile();

    controller = module.get<TestsessionController>(TestsessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
