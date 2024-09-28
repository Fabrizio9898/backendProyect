import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

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
