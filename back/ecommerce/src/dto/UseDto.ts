import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Length,
  Matches,
  IsEmpty,
} from 'class-validator';
import { isEmpty } from 'rxjs';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{6,20}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;


@IsEmpty()
isAdmin:boolean

  @IsInt()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @IsOptional()
  @Length(5, 20, { message: 'Country must be between 5 and 20 characters' })
  country?: string;

  @IsString()
  @IsOptional()
  @Length(3, 80, { message: 'Address must be between 3 and 80 characters' })
  address?: string;

  @IsString()
  @IsOptional()
  @Length(5, 20, { message: 'City must be between 5 and 20 characters' })
  city?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  @IsOptional()
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{6,20}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  phone: number;

  @IsOptional()
  @IsString()
  @IsOptional()
  @Length(5, 20, { message: 'Country must be between 5 and 20 characters' })
  country?: string;

  @IsString()
  @IsOptional()
  @Length(3, 80, { message: 'Address must be between 3 and 80 characters' })
  address?: string;

  @IsString()
  @IsOptional()
  @Length(5, 20, { message: 'City must be between 5 and 20 characters' })
  city?: string;
}
