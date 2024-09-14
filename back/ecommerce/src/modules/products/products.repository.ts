import { Injectable } from '@nestjs/common';
import IProducts from 'src/interfaces/products.interface';

@Injectable()
export class ProductRepository {
  private products: IProducts[] = [
    {
      id: 1,

      name: 'producto1',

      description: 'descripcion',

      price: 100,

      stock: true,

      imgUrl: '',
    },
    {
      id: 2,

      name: 'producto2',

      description: 'descripcion2',

      price: 200,

      stock: true,

      imgUrl: '',
    },
  ];

  async getProducts() {
    return this.products;
  }
}
