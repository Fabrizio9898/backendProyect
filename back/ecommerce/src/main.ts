import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGLobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger:['error','warn']
  });
  app.useGlobalPipes(new ValidationPipe())
  app.use(loggerGLobal)
  await app.listen(3000);
  console.log('aplicacion corriendo en el puerto 3000'); 
}
bootstrap();
