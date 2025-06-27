import { Expose } from 'class-transformer';
import { User } from '../../users/entities/user.entity';

export class AddLessonFinishedResponseDto {
  @Expose()
  message: string;

  @Expose()
  user: User;
}