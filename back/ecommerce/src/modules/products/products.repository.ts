import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/categorie.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/data.json';
import { CreateProductDto, UpdateProductDto } from 'src/dto/ProductDto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async addProducts() {

    const categories=await this.categoryRepository.find()
console.log('categories',categories);

  data?.map(async (cat)=>{
    console.log('cat',cat);
    
const category=categories.find((cate)=>cate.name==cat.category)
console.log('category',category);

const product=new Product()
product.name=cat.name;
product.description=cat.description;
product.price=cat.price;
product.stock=cat.stock;
product.category=category;

await this.productRepository
.createQueryBuilder()
.insert()
.into(Product)
.values(product)
.orUpdate(['description','price','stock'],['name'])
.execute()
  });
  return 'Productos agregados'
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['category'] });
  }

  async createProduct(productData: CreateProductDto) {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productRepository.findOne({ where: { id } });
  }

  async updateProduct(id: string, productData: UpdateProductDto) {
    await this.productRepository.update(id, productData);
    return this.getProductById(id);
  }

  async deleteProduct(id: string) {
    return await this.productRepository.delete(id);
  }
}
