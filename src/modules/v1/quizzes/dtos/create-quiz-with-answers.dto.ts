import { IsString, IsArray, ValidateNested, ArrayMinSize, ArrayMaxSize, IsInt, IsNotEmpty, IsBoolean } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { QuizAnswerInput } from './quiz-answer.input';

export class CreateQuizWithAnswersDto {
    // @Expose()
    @IsString()
    @IsNotEmpty()
    question: string;

    // @Expose()
    @IsArray()
    @ArrayMinSize(4)
    @ArrayMaxSize(4)
    @ValidateNested({ each: true })
    @Type(() => QuizAnswerInput)
    answers: QuizAnswerInput[];

    // @Expose()
    @IsInt({ message: 'lessonId must be an int.' })
    @IsNotEmpty({ message: 'lessonId is required.' })
    lessonId: number;
}
