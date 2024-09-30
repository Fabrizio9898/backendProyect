import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/entities/categorie.entity";
import Product from "src/entities/product.entity";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { ProductRepository } from "./products.repository";
import { CloudinaryConfig } from "src/config/cloudinary.config";
import { CLoudinaryService } from "src/common/cloudinary.service";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository,CloudinaryConfig,CLoudinaryService],
  exports:[ProductService, ProductRepository]
})
export class ProductsModule {}
