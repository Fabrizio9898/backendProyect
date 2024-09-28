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

/*

Products

    id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

    name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.

    description: debe ser un texto y no puede ser nulo.

    price: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.

    stock: debe ser un valor numérico. No puede ser nulo.

    imgUrl: debe ser una cadena de texto, en caso de no recibir un valor debe asignar una imagen por defecto.

    category_id  (Relación 1:N).

    Relación N:N con orderDetails.*/

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column({ length: 50, nullable: false })
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
