import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from 'src/entities/orderDetails.entity';
import { Orders } from 'src/entities/orders.entity';
import Product from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addOrder(userId: string, products: any) {
    let total = 0;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) return `Usuario no encontrado`;
    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.orderRepository.save(order);
    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productRepository.findOneBy({
          id: element.id,
        });
        if (!product) return `Producto no encontrado`;
        total += Number(product.price);
        await this.productRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );
    const orderDetail = new OrderDetail();
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;
    await this.orderDetailRepository.save(orderDetail);
    return await this.orderRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetail: true,
      },
    });
  }

  async getOrder(id:string) {
    const order=this.orderRepository.findOne({
      where:{id},
      relations:{
        orderDetail:{
            products:true
        }
      }  
    })

    if(!order){
        return `Orden no encontrada`
    }

    return order;
  }


}
