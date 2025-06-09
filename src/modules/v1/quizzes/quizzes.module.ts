import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entities/quiz.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAnswer } from '../quiz_answers/entities/quiz-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Lesson, QuizAnswer])],
  controllers: [QuizzesController],
  providers: [QuizzesService]
})
export class QuizzesModule {}
