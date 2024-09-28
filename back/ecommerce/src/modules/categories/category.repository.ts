import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categorie.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/data.json';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async addCategories() {
    // Usar un Set para obtener nombres únicos
    const uniqueCategories = new Set(data.map(cat => cat.category));

    for (const category of uniqueCategories) {
      await this.categoryRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values({ name: category })
        .orIgnore() // Ignora duplicados si ya existen
        .execute();
    }

    return 'Categorías agregadas';
  }
}
