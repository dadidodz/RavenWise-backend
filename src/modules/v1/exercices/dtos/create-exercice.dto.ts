import { IsNotEmpty, IsString, IsBoolean, IsInt, MaxLength, IsOptional } from 'class-validator';

export class CreateExerciceDto {
    @IsString({ message: 'Content must be a string.' })
    @IsNotEmpty({ message: 'Content is required.' })
    @MaxLength(10000, { message: 'Description must not exceed 10,000 characters.' })
    content: string;

    @IsOptional()
    @IsString({ message: 'Image must be a string.' })
    @MaxLength(10000, { message: 'Description must not exceed 10,000 characters.' })
    deposit?: string;

    @IsInt({ message: 'lessonId must be an int.' })
    @IsNotEmpty({ message: 'lessonId is required.' })
    lessonId: number;
}
