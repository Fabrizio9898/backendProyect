import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Product from "./product.entity";
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column({ length: 50 })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}