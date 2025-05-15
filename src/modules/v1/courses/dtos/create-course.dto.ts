import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { CourseDifficulty } from '../enum/course-difficulty.enum';
import { CourseCategory } from '../enum/course-category.enum';

export class CreateCourseDto {
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title is required.' })
  @MaxLength(255, { message: 'Title must not exceed 255 characters.' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description is required.' })
  @MaxLength(10000, { message: 'Description must not exceed 10,000 characters.' })
  description?: string;

  @IsEnum(CourseDifficulty, { message: 'Difficulty must be one of: beginner, intermediate, advanced, expert.' })
  @IsNotEmpty({ message: 'Difficulty is required.' })
  difficulty: CourseDifficulty;

  @IsEnum(CourseCategory, { message: 'Category must be one of: web development, framework, programming, data science, mobile development, design.' })
  @IsNotEmpty({ message: 'Category is required.' })
  category: CourseCategory;

  @IsString({ message: 'Image must be a string.' })
  @IsNotEmpty({ message: 'Image is required.' })
  @MaxLength(255, { message: 'Image URL must not exceed 255 characters.' })
  image: string;
}
