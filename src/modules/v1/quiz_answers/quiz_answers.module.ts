import { Module } from '@nestjs/common';
import { QuizAnswersController } from './quiz_answers.controller';
import { QuizAnswersService } from './quiz_answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAnswer } from './entities/quiz-answer.entity';
import { Quiz } from '../quizzes/entities/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizAnswer, Quiz])],
  controllers: [QuizAnswersController],
  providers: [QuizAnswersService]
})
export class QuizAnswersModule {}
