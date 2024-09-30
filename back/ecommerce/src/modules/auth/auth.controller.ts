import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CredentialsDto } from "src/dto/CredentialsDto";

@Controller('auth')
export class AuthController{
    constructor(private readonly authServie:AuthService){}

    @Get()
    getAuth(){
        return this.authServie.getAuth()
    }


  @Post('signin')
  async signIn(@Body() credentials:CredentialsDto){
    const {email,password}=credentials
    return this.authServie.signIn(email,password)
  }
}