import { IsInt, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class ValidateQuizAnswerDto {
  @Expose()
  @IsInt({ message: 'answerId must be an integer' })
  @IsNotEmpty({ message: 'answerId is required' })
  answerId: number;
}