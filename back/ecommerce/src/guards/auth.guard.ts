import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request=context.switchToHttp().getRequest()
        return validateRequest(request)
    }
}

function validateRequest(request: Request): boolean | Promise<boolean> | Observable<boolean> {
    const authorizationHeader = request.headers['authorization'];

    // Verificar que el header Authorization existe
    if (!authorizationHeader) {
      throw new HttpException('Authorization header is missing', HttpStatus.UNAUTHORIZED);
    }

    // Verificar que el header tiene la estructura correcta
    const [scheme, credentials] = authorizationHeader.split(' ');

    if (scheme !== 'Basic' || !credentials) {
      throw new HttpException('Invalid authorization format', HttpStatus.UNAUTHORIZED);
    }

    const [email, password] = Buffer.from(credentials, 'base64').toString().split(':');
    
    // Asegurarse de que tanto email como password están presentes
    if (!email || !password) {
      throw new HttpException('Email and password must be provided', HttpStatus.UNAUTHORIZED);
    }

    return true; 
}
