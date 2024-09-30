import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 50)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{6,20}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @IsInt()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  country?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  city?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 50)
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
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
  @Length(1, 50)
  country?: string;

  
  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  city?: string;
}
