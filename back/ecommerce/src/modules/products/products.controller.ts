import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProductDto, UpdateProductDto } from 'src/dto/ProductDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CLoudinaryService } from 'src/common/cloudinary.service';
import { MinSizeValidator } from 'src/pipes/MinSizeValidator.pipe';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService,private readonly cloudinaryService:CLoudinaryService) {}

  @Get('seeder')
  addProducts() {
    return this.productService.addProducts();
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

 
@Post('upload_image/:id')
@UseGuards(AuthGuard)
@UseInterceptors(FileInterceptor('image'))
@UsePipes(MinSizeValidator)
async uploadImage(@Param('id', ParseUUIDPipe) id: string, @UploadedFile(
  // new ParseFilePipe({
  //   validators:[new MaxFileSizeValidator({
  //     maxSize:1000000,
  //     message:'El archivo debe ser menor a 1MB'
  //   }),
  // new FileTypeValidator({
  //   fileType:/(jpg|jpeg|png|webp)$/,
  // })]
  // })
) image: Express.Multer.File) {
  
const imageUrl= await this.cloudinaryService.uploadImage(image)
return this.productService.uploadImage(id,imageUrl.secure_url)
}


  @Post()
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  createProduct(@Body() productData: CreateProductDto) {
    return this.productService.createProduct(productData);
  }

  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.getProductById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productData: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, productData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.deleteProduct(id);
  }
}
