import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private readonly authServie:AuthService){}

    @Get()
    getAuth(){
        return this.authServie.getAuth()
    }
}