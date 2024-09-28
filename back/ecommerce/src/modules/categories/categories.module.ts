import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/entities/categorie.entity";
import { CategoryController } from "./categories.controller";
import { CategoryService } from "./categories.service";
import { CategoryRepository } from "./category.repository";


@Module({ imports: [TypeOrmModule.forFeature([Category])],
    controllers:[CategoryController],
    providers: [CategoryService,CategoryRepository],  exports: [CategoryService, CategoryRepository]}) 
    export class CategoriesModule{

}