import { DynamicModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

export const DatabasePostgresConnection: DynamicModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/entities/*{.ts,.js}'],
  logging: process.env.DEBUG_SQL === 'true' ? true : false,
})
