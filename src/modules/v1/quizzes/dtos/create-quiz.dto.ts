import { IsNotEmpty, IsString, IsBoolean, IsInt, MaxLength, IsOptional } from 'class-validator';

export class CreateQuizDto {
    @IsString({ message: 'Question must be a string.' })
    @IsNotEmpty({ message: 'Question is required.' })
    @MaxLength(10000, { message: 'Question must not exceed 10,000 characters.' })
    question: string;

    @IsInt({ message: 'lessonId must be an int.' })
    @IsNotEmpty({ message: 'lessonId is required.' })
    lessonId: number;
}
