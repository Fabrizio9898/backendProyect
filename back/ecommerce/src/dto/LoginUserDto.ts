import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario. Debe ser un correo válido.',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 50)
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario. Debe tener entre 8 y 15 caracteres, con al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    example: 'Password123!',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{6,20}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;
}
