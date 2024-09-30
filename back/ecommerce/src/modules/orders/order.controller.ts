import { Body, Controller, Get, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  addOrder(@Body() order: any) {
    const { userId, products } = order;
    this.orderService.addOrder(userId, products);
  }

  @Get(':id')
  getOrder(@Query('id',ParseUUIDPipe) id: string) {
    this.orderService.getOrder(id);
  }
}
