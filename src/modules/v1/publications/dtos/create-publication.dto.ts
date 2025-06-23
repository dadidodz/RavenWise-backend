import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength,
    MaxLength,
    Matches,
    Length,
    IsEnum,
} from 'class-validator';
import { CourseCategory } from '../../courses/enum/course-category.enum';
  
export class CreatePublicationDto {
    @IsString({ message: 'Title must be a string.' })
    @IsNotEmpty({ message: 'Title is required.' })
    @MaxLength(255, { message: 'Title must not exceed 255 characters.' })
    title: string;

    @IsString({ message: 'Description is required.' })
    @MaxLength(10000, { message: 'Description must not exceed 10,000 characters.' })
    description: string;

    @IsString()
    @IsNotEmpty()
    authorClerkId: string;

    @IsEnum(CourseCategory, { message: 'Category must be one of: web development, framework, programming, data science, mobile development, design.' })
    @IsNotEmpty({ message: 'Category is required.' })
    category: CourseCategory;

}
  