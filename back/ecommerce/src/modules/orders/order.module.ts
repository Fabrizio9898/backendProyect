import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "src/entities/orders.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderRepository } from "./order.repository";
import { User } from "src/entities/user.entity";
import Product from "src/entities/product.entity";
import { OrderDetail } from "src/entities/orderDetails.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Orders,User,Product,OrderDetail])],
    controllers:[OrderController],
    providers:[OrderService,OrderRepository],
})

export class OrderModule{}
