import { TypeOrmModule } from "@nestjs/typeorm"

export const TypeOrmConfig=TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 3001,
    username: 'fabrizio',
    password: 'Fabrizio98',
    database: 'backproyect',
    logging:false,
    entities: [],
    synchronize: true,
  })