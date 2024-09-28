import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from 'src/entities/categorie.entity';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository
  ) {}

  getCategories(){
    return this.categoryRepository.getCategories()
      }
      

  addCategories(){
  return this.categoryRepository.addCategories()
  }


}
