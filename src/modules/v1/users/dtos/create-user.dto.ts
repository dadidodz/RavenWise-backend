import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength,
    MaxLength,
    Matches,
    Length,
    IsEnum,
    IsOptional,
  } from 'class-validator';
import { UserRole } from '../enum/user-role.enum';
  
  export class CreateUserDto {
    @IsString({message: 'id must be a string'})
    // @Length(20, 20, { message: 'id must be exactly 20 characters long' })
    @IsNotEmpty({message: 'clrekId is required'})
    clerkId: string;

    @IsOptional()
    @IsString({message: 'firstName must be a string'})
    firstName: string;

    @IsOptional()
    @IsString({message: 'lastName must be a string'})
    lastName: string;

    @IsOptional()
    @IsString({message: 'imageUrl must be a string'})
    imageUrl: string;

    @IsString({message: 'email must be a string'})
    @IsNotEmpty({message: 'email is required'})
    @IsEmail({}, { message: 'L’email doit être valide.' })
    email: string;

    @IsEnum(UserRole, { message: 'role must be one of: admin, free, or premium' })
    role: UserRole;

    // @IsString()
    // @IsNotEmpty({ message: 'Le nom d’utilisateur est requis.' })
    // username: string;
  
    // @IsNotEmpty({ message: 'L’email est requis.' })
    // @IsEmail({}, { message: 'L’email doit être valide.' })
    // email: string;
  
    // @IsNotEmpty()
    // @MinLength(12, { message: 'Le mot de passe doit faire au moins 12 caractères.' })
    // @MaxLength(52, { message: 'Le mot de passe doit faire moins de 52 caractères.' })
    // @Matches(/.*[A-Z].*/, {
    //   message: 'Le mot de passe doit contenir au moins une majuscule.',
    // })
    // @Matches(/.*\d.*/, {
    //   message: 'Le mot de passe doit contenir au moins un chiffre.',
    // })
    // @Matches(/.*[!@#$%^&*(),.?":{}|<>].*/, {
    //   message: 'Le mot de passe doit contenir au moins un caractère spécial.',
    // })
    // password: string;
  }
  