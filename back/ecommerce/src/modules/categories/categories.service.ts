import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { Category } from 'src/entities/categorie.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}


  async getCategories(): Promise<Category[]> {
    const categories=await  this.categoryRepository.getCategories();
    return categories;
  }

  async addCategories(categories: string[]): Promise<void> {
    const uniqueCategories = [...new Set(categories)];
    const categoryEntities = uniqueCategories.map((name) => {
      const category = new Category();
      category.name = name;
      return category;
    });
    await this.categoryRepository.addCategories(categoryEntities);
  }
}
