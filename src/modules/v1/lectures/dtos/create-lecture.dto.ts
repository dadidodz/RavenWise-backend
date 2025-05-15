import { IsNotEmpty, IsString, IsBoolean, IsInt, MaxLength, IsOptional } from 'class-validator';

export class CreateLectureDto {
    @IsString({ message: 'Content must be a string.' })
    @IsNotEmpty({ message: 'Content is required.' })
    @MaxLength(10000, { message: 'Description must not exceed 10,000 characters.' })
    content: string;

    @IsInt({ message: 'lessonId must be an int.' })
    @IsNotEmpty({ message: 'lessonId is required.' })
    lessonId: number;
}
