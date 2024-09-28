import { Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('products')
export class ProductsController{
    constructor(private readonly productsService:ProductsService){}
    
        @Get()
        getProducts(){
return this.productsService.getProducts()
        }

        @Post()
        @UseGuards(AuthGuard)
        createProduct(){

        }
    
        @Get(":id")
        getProductById(){

        }

        @Put(":id")
        @UseGuards(AuthGuard)
        updateProduct(){

        }

        @Delete(':id')
        @UseGuards(AuthGuard)
        deleteProduct(){
                
        }

}