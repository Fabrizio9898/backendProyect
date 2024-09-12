import { Injectable, NestMiddleware } from "@nestjs/common";
import {Request, NextFunction, Response } from "express";

@Injectable()
export class LoggerMiddlere implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`estas ehecutando un metodo ${req.method} en la ruta ${req.url}`);
        next()
    }
    
    }

export function loggerGLobal(req: Request, res: Response, next: NextFunction){
    const date=new Date()
    console.log(`estas escuchando un metodo ${req.method} en la ruta ${req.url} a la hora ${date.toISOString()}` );
    next()
}