import { Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  getProducts() {
    return this.productRepository.getProducts();
  }

  addProducts() {
    return this.productRepository.addProducts();
  }
}
