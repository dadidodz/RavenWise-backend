import {
  IsOptional,
  IsString,
  MaxLength,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { CourseDifficulty } from '../enum/course-difficulty.enum';
import { CourseCategory } from '../enum/course-category.enum';


export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10000)
  description?: string;

  @IsOptional()
  @IsEnum(CourseDifficulty, { message: 'Invalid difficulty value.' })
  difficulty?: CourseDifficulty;

  @IsOptional()
  @IsEnum(CourseCategory, { message: 'Invalid category value.' })
  category?: CourseCategory;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  image?: string;

  @IsOptional()
  @IsBoolean({ message: 'isPublished must be a boolean value.' })
  isPublished?: boolean;
}
