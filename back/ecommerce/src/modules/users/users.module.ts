import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.services";
import { UsersController } from "./users.controller";
import { UserRepository } from "./users.repository";
import { AuthGuard } from "src/guards/auth.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { requiresAuth } from "express-openid-connect";

;
// import { LoggerMiddlere } from "src/middlewares/logger.middleware";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService,UserRepository,AuthGuard],
    exports:[UserRepository]
})

// export class UsersModule implements NestModule{
//     configure(consumer: MiddlewareConsumer) {
//         consumer.apply(LoggerMiddlere).forRoutes('users')
//     }
// }

export class UsersModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(requiresAuth()).forRoutes('users/auth0/protected')
    }
}