import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGLobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './helpers/http-exception.filter';
import { auth } from 'express-openid-connect';
import { auth0Config } from './config/auth0.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger:['error','warn']
  });



  app.use(auth(auth0Config))
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(loggerGLobal)
  await app.listen(3000);
  console.log('aplicacion corriendo en el puerto 3000'); 
}
bootstrap();
