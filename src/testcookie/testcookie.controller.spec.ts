import { Test, TestingModule } from '@nestjs/testing';
import { TestCookieController } from './testcookie.controller';

describe('SnippettestController', () => {
  let controller: TestCookieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestCookieController],
    }).compile();

    controller = module.get<TestCookieController>(TestCookieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
