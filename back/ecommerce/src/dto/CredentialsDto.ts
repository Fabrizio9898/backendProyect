import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CredentialsDto {
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
}
