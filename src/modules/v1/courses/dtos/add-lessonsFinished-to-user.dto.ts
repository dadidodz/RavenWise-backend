import { IsInt, IsPositive } from 'class-validator';

export class AddLessonFinishedToUserDto {
  @IsInt()
  @IsPositive()
  lessonId: number;
}