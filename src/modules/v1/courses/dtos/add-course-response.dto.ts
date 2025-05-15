import { Expose } from 'class-transformer';
import { User } from '../../users/entities/user.entity';

export class AddCourseResponseDto {
  @Expose()
  message: string;

  @Expose()
  user: User;
}