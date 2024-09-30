import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import typeOrmConfig from './config/typeorm.config'
import { CategoriesModule } from './modules/categories/categories.module';
import { SeedModule } from './modules/seed/seed.module';
import { OrderModule } from './modules/orders/order.module';


@Module({
  imports: [UsersModule,ProductsModule,CategoriesModule,AuthModule,OrderModule,SeedModule, ConfigModule.forRoot({
    isGlobal:true,
  load:[typeOrmConfig]  }) ,TypeOrmModule.forRootAsync({
   inject:[ConfigService],
   useFactory:(configService:ConfigService)=>configService.get('typeorm')
  })],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
