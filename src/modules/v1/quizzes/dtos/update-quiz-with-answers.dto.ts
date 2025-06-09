import {
  IsString,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { QuizAnswerInput } from './quiz-answer.input';

export class UpdateQuizWithAnswersDto {
    @Expose()
    @IsOptional()
    @IsString()
    question?: string;

    @Expose()
    @IsOptional()
    @IsArray()
    @ArrayMinSize(4)
    @ArrayMaxSize(4)
    @ValidateNested({ each: true })
    @Type(() => QuizAnswerInput)
    answers?: QuizAnswerInput[];

    @Expose()
    @IsOptional()
    @IsInt({ message: 'lessonId must be an int.' })
    @IsNotEmpty({ message: 'lessonId is required.' })
    lessonId?: number;
}