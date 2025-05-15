import { IsNotEmpty, IsString, IsInt, IsOptional, MaxLength, IsEnum } from 'class-validator';
import { LessonType } from '../enum/lesson-type.enum';

export class CreateLessonDto {
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title is required.' })
  @MaxLength(255, { message: 'Title must not exceed 255 characters.' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description is required.' })
  @MaxLength(10000, { message: 'Description must not exceed 10,000 characters.' })
  content?: string;

  @IsEnum(LessonType, { message: 'Type must be one of: exercice, lecture, quiz.' })
  @IsNotEmpty({ message: 'Type is required.' })
  type: LessonType;

  @IsInt({ message: 'estimatedDuration must be an int.' })
  @IsNotEmpty({ message: 'estimatedDuration is required.' })
  estimatedDuration: number;

  @IsInt({ message: 'chapterId must be an int.' })
  @IsNotEmpty({ message: 'chapterId is required.' })
  chapterId: number;
}
