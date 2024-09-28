import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import Product from "src/entities/product.entity";

@Module({ 
    imports:[TypeOrmModule.forFeature([Product])],
    controllers: [ProductsController],
    providers: [ProductsService,ProductRepository]})
export class ProductsModule{

}