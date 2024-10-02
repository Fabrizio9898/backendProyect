import { ApiProperty } from '@nestjs/swagger';
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

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  @ApiProperty({
    description: 'Nombre del usuario. Debe tener entre 3 y 80 caracteres.',
    example: 'John Doe',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Correo electrónico del usuario. Debe ser un correo válido.',
    example: 'johndoe@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{6,20}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  @ApiProperty({
    description:
      'Contraseña del usuario. Debe contener entre 8 y 15 caracteres, con al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    example: 'Password123!',
  })
  password: string;

  @IsEmpty()
  @ApiProperty({
    description:
      'Indica si el usuario es administrador. Este campo es asignado por el sistema y debe estar vacío.',
    example: false,
    readOnly: true,
  })
  isAdmin: boolean;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Número de teléfono del usuario. Debe ser un número entero.',
    example: 1234567890,
  })
  phone: number;

  @ApiProperty({
    description:
      'País de residencia del usuario. Debe tener entre 3 y 20 caracteres. Opcional.',
    example: 'USA',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(3, 20, { message: 'Country must be between 5 and 20 characters' })
  country?: string;

  @ApiProperty({
    description:
      'Dirección del usuario. Debe tener entre 3 y 80 caracteres. Opcional.',
    example: '123 Main St',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(3, 80, { message: 'Address must be between 3 and 80 characters' })
  address?: string;

  @ApiProperty({
    description:
      'Ciudad de residencia del usuario. Debe tener entre 5 y 20 caracteres. Opcional.',
    example: 'New York',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(5, 20, { message: 'City must be between 5 and 20 characters' })
  city?: string;
}
