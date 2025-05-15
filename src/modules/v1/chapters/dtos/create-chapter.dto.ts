import { IsNotEmpty, IsString, IsInt, IsOptional, MaxLength } from 'class-validator';

export class CreateChapterDto {
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title is required.' })
  @MaxLength(255, { message: 'Title must not exceed 255 characters.' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description is required.' })
  @MaxLength(10000, { message: 'Description must not exceed 10,000 characters.' })
  description?: string;

  @IsInt({ message: 'courseId must be an int.' })
  @IsNotEmpty({ message: 'courseId is required.' })
  courseId: number;
}
