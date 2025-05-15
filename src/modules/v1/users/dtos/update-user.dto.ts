import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { UserRole } from '../enum/user-role.enum';


export class UpdateUserDto {
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be one of: admin, free, premium.' })
  role?: UserRole;

  @IsOptional()
  @IsInt({ message: 'Hours spent must be an integer.' })
  @Min(0, { message: 'Hours spent cannot be negative.' })
  hours_spent?: number;
}
