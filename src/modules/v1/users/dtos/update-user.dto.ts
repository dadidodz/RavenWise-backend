import { IsEmail, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { UserRole } from '../enum/user-role.enum';


export class UpdateUserDto {
  @IsOptional()
  @IsString({message: 'firstName must be a string'})
  firstName?: string;
  
  @IsOptional()
  @IsString({message: 'lastName must be a string'})
  lastName?: string;

  @IsOptional()
  @IsString({message: 'imageUrl must be a string'})
  imageUrl?: string;

  @IsOptional()
  @IsString({message: 'email must be a string'})
  @IsEmail({}, { message: 'L’email doit être valide.' })
  email?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be one of: admin, free, premium.' })
  role?: UserRole;

  @IsOptional()
  @IsInt({ message: 'Hours spent must be an integer.' })
  @Min(0, { message: 'Hours spent cannot be negative.' })
  hours_spent?: number;
}
