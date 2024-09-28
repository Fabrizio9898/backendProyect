import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { OrderDetail } from './orderDetails.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column('date')
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetail;
}
