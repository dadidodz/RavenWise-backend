import {
  IsOptional,
  IsString,
  MaxLength,
  IsEnum,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { LessonType } from '../enum/lesson-type.enum';

export class UpdateLessonDto {
    @IsOptional()
    @IsString({ message: 'Title must be a string.' })
    @MaxLength(255, { message: 'Title must not exceed 255 characters.' })
    title?: string;

    @IsOptional()
    @IsString({ message: 'Description is required.' })
    @MaxLength(10000, { message: 'Description must not exceed 10,000 characters.' })
    content?: string;

    @IsOptional()
    @IsEnum(LessonType, { message: 'Type must be one of: exercice, lecture, quiz.' })
    type?: LessonType;

    @IsOptional()
    @IsInt({ message: 'estimatedDuration must be an int.' })
    estimatedDuration?: number;

    @IsOptional()
    @IsInt({ message: 'chapterId must be an int.' })
    chapterId?: number;
}
