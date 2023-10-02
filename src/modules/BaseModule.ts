import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { CustomExceptionFilter } from '../filters/CustomExceptionFilter'
import { LoggerMiddleware } from '../middlewares/LoggerMiddleware'
import { ProcessHeaderMiddleware } from '../middlewares/ProcessHeaderMiddleware'
import { BaseController } from './../controllers/BaseController'

const providerAppFilter = { provide: APP_FILTER, useClass: CustomExceptionFilter }

@Module({
  imports: [],
  controllers: [BaseController],
  exports: [],
  providers: [providerAppFilter],
})
export class BaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProcessHeaderMiddleware).forRoutes('*')
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
