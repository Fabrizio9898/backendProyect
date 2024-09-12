import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.services";
import { UsersController } from "./users.controller";
import { LoggerMiddlere } from "src/middlewares/logger.middleware";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
})

// export class UsersModule implements NestModule{
//     configure(consumer: MiddlewareConsumer) {
//         consumer.apply(LoggerMiddlere).forRoutes('users')
//     }
// }

export class UsersModule{}