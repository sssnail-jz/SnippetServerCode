import { Test, TestingModule } from '@nestjs/testing';
import { TestfileuploadController } from './testfileupload.controller';

describe('TestfileuploadController', () => {
  let controller: TestfileuploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestfileuploadController],
    }).compile();

    controller = module.get<TestfileuploadController>(TestfileuploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
