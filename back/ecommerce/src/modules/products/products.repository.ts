import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/categorie.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/data.json';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['category'] });
  }

  async addProducts() {
    for (const item of data) {
      const category = await this.categoryRepository.findOne({ where: { name: item.category } });
      
      if (category) {
        await this.productRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values({
            name: item.name,
            description: item.description,
            price: item.price,
            stock: item.stock,
            category: category,
          })
          .orIgnore()
          .execute();
      }
    }
    return 'Productos agregados';
  }
}
