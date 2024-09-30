import { Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { CreateProductDto, UpdateProductDto } from 'src/dto/ProductDto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}
uploadImage(id:string,imageUrl:string){
  return this.productRepository.uploadImage(id,imageUrl)
}
  
  addProducts() {
      return this.productRepository.addProducts();
    }
    
    getProducts() {
      return this.productRepository.getProducts();
    }

  createProduct(productData: CreateProductDto) {
    return this.productRepository.createProduct(productData);
}

getProductById(id: string) {
    return this.productRepository.getProductById(id);
}

updateProduct(id: string, productData: UpdateProductDto) {
    return this.productRepository.updateProduct(id, productData);
}

deleteProduct(id: string) {
    return this.productRepository.deleteProduct(id);
}
}
