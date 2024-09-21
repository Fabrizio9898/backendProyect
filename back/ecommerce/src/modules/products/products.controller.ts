import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController{
    constructor(private readonly productsService:ProductsService){}
    /**Todos los endpoints de Products, salvo el GET y el GET{id} deben utilizar esta guarda. */
    
        @Get()
        getProducts(){
return this.productsService.getProducts()
        }

        @Post()
        createProduct(){

        }
    
        @Get(":id")
        getProductById(){

        }

        @Put(":id")
        updateProduct(){

        }

        @Delete(':id')
        deleteProduct(){
                
        }

}