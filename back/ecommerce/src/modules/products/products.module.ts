import { Module } from "@nestjs/common";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { ProductRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import Product from "src/entities/product.entity";

@Module({ 
    imports:[TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
    providers: [ProductService,ProductRepository]})
export class ProductsModule{

}