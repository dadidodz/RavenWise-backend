import { IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateLectureDto {
@IsString({ message: 'Content must be a string.' })

    @IsOptional()
    @MaxLength(10000, { message: 'Description must not exceed 10,000 characters.' })
    content?: string;

    @IsOptional()
    @IsInt({ message: 'lessonId must be an int.' })
    lessonId?: number;
}
