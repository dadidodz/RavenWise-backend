import { IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateExerciceDto {

    @IsOptional()
    @IsString({ message: 'startingCode must be a string.' })
    startingCode?: string;

    @IsOptional()
    @IsString({ message: 'Solution must be a string.' })
    @MaxLength(10000, { message: 'Solution must not exceed 10,000 characters.' })
    solution?: string;
    
    @IsOptional()
    @IsString({ message: 'Content must be a string.' })
    @MaxLength(10000, { message: 'Description must not exceed 10,000 characters.' })
    content?: string;
    
    @IsOptional()
    @IsString({ message: 'Image must be a string.' })
    @MaxLength(10000, { message: 'Description must not exceed 10,000 characters.' })
    deposit?: string;

    @IsOptional()
    @IsInt({ message: 'lessonId must be an int.' })
    lessonId?: number;
}
