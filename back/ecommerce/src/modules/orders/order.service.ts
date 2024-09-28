import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order.repository";

@Injectable()
export class OrderService{
    constructor(private orderRepository:OrderRepository){}

addOrder(userId,products){
    return this.orderRepository.addOrder(userId,products)
}

getOrder(userId){
    return this.orderRepository.getOrder(userId)
}

}