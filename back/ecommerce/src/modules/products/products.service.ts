import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./products.repository";
import { InjectRepository } from "@nestjs/typeorm";
import Product from "src/entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductsService{

    constructor(
        @InjectRepository(Product)
        private productRepository:Repository<Product>){}

    getProducts(){
        return  this.productRepository.find()
    }
}