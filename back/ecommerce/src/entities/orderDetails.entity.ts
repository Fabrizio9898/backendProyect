import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import Product from "./product.entity";
import { Orders } from "./orders.entity";


@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @OneToOne(() => Orders, (order) => order.orderDetail)
    @JoinColumn({name:'order_id'})
    order: Orders;

    @ManyToMany(() => Product, (product) => product.orderDetails)
    products: Product[];
}