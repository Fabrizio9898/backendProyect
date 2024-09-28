import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categorie.entity';
import { DataSource, Repository } from 'typeorm';
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
    data?.map(async (cat) => {
      await this.categoryRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values({ name: cat.category })
        .orIgnore()
        .execute();
    });
    return 'Categorias agregadas';
  }
}
