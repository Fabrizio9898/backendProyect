// import { Injectable } from '@nestjs/common';
// import { CategoryService } from '../categories/categories.service';
// import { ProductService } from '../products/products.service';

// @Injectable()
// export class SeedService {
//   constructor(
//     private readonly categoryService: CategoryService,
//     private readonly productService: ProductService,
//   ) {}

//   async seedData() {
//     const categoriesExist = await this.categoryService.getCategories();

//     if (categoriesExist.length === 0) {
//       await this.categoryService.addCategories();
//     }

//     const productsExist = await this.productService.getProducts(); 
//     if (productsExist.length === 0) {
//       await this.productService.addProducts();
//     }

//     return 'Datos precargados correctamente';
//   }
// }
