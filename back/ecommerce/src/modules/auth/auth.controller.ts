import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/UseDto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/dto/LoginUserDto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authServie: AuthService) {}

  @Post('singIn')
  singIn(@Body() userData: LoginUserDto) {
    return this.authServie.signIn(userData);
  }

  @Post('singUp')
  @HttpCode(201)
  signUp(@Body() userData: CreateUserDto) {
    return this.authServie.signUp(userData);
  }
}
