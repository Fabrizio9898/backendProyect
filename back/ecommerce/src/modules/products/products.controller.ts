import { Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { ProductService } from "./products.service";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('products')
export class ProductController{
    constructor(private readonly productService:ProductService){}
    

    @Get('seeder')
  addProducts() {
    return this.productService.addProducts();
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
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