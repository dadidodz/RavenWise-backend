import { IsInt, IsPositive } from 'class-validator';

export class AddCourseToUserDto {
  @IsInt()
  @IsPositive()
  courseId: number;
}