import { Controller, Post } from '@nestjs/common';
import { CategoryService } from './categories.service';


@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('seeder')
  async seedCategories() {
    const categories = [
      "smartphone", 
      "monitor", 
      "keyboard", 
      "mouse"
    ];
    await this.categoryService.addCategories(categories);
    return { message: 'Categorías cargadas exitosamente.' };
  }
}
