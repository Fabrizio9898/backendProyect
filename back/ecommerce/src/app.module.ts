import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import Product from './entities/product.entity';

@Module({
  imports: [UsersModule,ProductsModule,AuthModule,ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'./.env.development'
  }) ,TypeOrmModule.forRootAsync({
   inject:[ConfigService],
   useFactory:(configService:ConfigService)=>({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [User,Product],
    synchronize: true,
   })
  })],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
