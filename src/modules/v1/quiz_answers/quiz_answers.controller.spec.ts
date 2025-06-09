import { Test, TestingModule } from '@nestjs/testing';
import { QuizAnswersController } from './quiz_answers.controller';

describe('QuizAnswersController', () => {
  let controller: QuizAnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizAnswersController],
    }).compile();

    controller = module.get<QuizAnswersController>(QuizAnswersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
