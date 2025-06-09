import { IsString, IsBoolean } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class QuizAnswerInput {
  @Expose()
  @IsString()
  answer: string;

  @Expose()
  @IsBoolean()
  @Type(() => Boolean)
  isCorrect: boolean;
}