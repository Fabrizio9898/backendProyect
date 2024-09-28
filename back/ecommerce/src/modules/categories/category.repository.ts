import { Injectable } from "@nestjs/common";
import { Category } from "src/entities/categorie.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async getCategories(): Promise<Category[]> {
    return this.find();
  }

  async addCategories(categories: Category[]): Promise<void> {
    await this.save(categories);
  }
  
}