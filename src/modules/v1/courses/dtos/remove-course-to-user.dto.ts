import { IsInt, IsPositive } from 'class-validator';

export class RemoveCourseToUserDto {
  @IsInt()
  @IsPositive()
  courseId: number;
}