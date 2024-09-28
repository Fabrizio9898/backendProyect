import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrderDetail } from './orderDetails.entity';
import { Category } from './categorie.entity';



@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column({ length: 50, nullable: false ,unique:true})
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @Column('int', { nullable: false })
  stock: number;

  @Column({ default: 'default-image-url.jpg' })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  @JoinTable({
    name: 'product_order_detail',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'order_detail_id',
      referencedColumnName: 'id',
    },
  })
  orderDetails: OrderDetail[];
}

export default Product;
