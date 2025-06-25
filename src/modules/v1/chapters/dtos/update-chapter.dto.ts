import { IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateChapterDto {

    @IsOptional()
    @IsString({ message: 'Title must be a string.' })
    @MaxLength(255, { message: 'Title must not exceed 255 characters.' })
    title?: string;

    @IsOptional()
    @IsString({ message: 'Description is required.' })
    @MaxLength(10000, { message: 'Description must not exceed 10,000 characters.' })
    description?: string;

    @IsOptional()
    @IsInt({ message: 'courseId must be an int.' })
    courseId?: number;
}
