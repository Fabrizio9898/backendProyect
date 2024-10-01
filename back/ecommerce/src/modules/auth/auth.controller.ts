import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/dto/UseDto";

@Controller('auth')
export class AuthController{
    constructor(private readonly authServie:AuthService){}


    @Get('singIn')
  singIn(@Body() userData:any){
    return this.authServie.signIn(userData)
  }

  @Post('singUp')
  @HttpCode(201)
   signUp(@Body() userData: CreateUserDto) {
   return this.authServie.signUp(userData)
  }

}