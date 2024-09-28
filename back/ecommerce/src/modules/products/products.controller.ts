import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProductService } from "./products.service";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateProductDto, UpdateProductDto } from "src/dto/ProductDto";

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
  createProduct(@Body() productData: CreateProductDto) {
      return this.productService.createProduct(productData);
  }

  @Get(":id")
  getProductById(@Param('id') id: string) {
      return this.productService.getProductById(id);
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: string, @Body() productData: UpdateProductDto) {
      return this.productService.updateProduct(id, productData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: string) {
      return this.productService.deleteProduct(id);
  }

}