import { Module, OnModuleInit } from '@nestjs/common';
import { CategoryService } from '../categories/categories.service';
import { ProductService } from '../products/products.service';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [CategoriesModule, ProductsModule],
  providers: [CategoryService, ProductService],
})
export class SeedModule implements OnModuleInit {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly dataSource: DataSource,  // Asegúrate de inyectar el DataSource
  ) {}

  async onModuleInit() {
    await this.dataSource.runMigrations();
    await this.categoryService.addCategories();
    await this.productService.addProducts();
  }
}
