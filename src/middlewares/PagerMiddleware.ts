import { HttpException, HttpStatus, Injectable, NestMiddleware, UseFilters } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { Logger } from '../configurations/LoggerConfiguration'
import { ExceptionDTO } from '../dtos/ExceptionDTO'
import { CustomExceptionFilter } from '../filters/CustomExceptionFilter'

@Injectable()
@UseFilters(new CustomExceptionFilter())
export class PagerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    try {
      const page = request.query.page ? Number(request.query.page) : 1
      const pageSize = request.query.pageSize ? Number(request.query.pageSize) : 20

      if (Number.isNaN(page) || Number.isNaN(pageSize)) throw ExceptionDTO.warn('Bad pagination request', 'Paging parameters should be numeric')
      if (page <= 0 || pageSize <= 0) throw ExceptionDTO.warn('Bad pagination request', 'Paging parameters must be positive numbers')
      if (pageSize > 100) throw ExceptionDTO.warn('Bad pagination request', 'Maximum page size allowed is 100')

      request.query.page = ((page - 1) * pageSize).toString()
      request.query.pageSize = pageSize.toString()
      next()
    } catch (error) {
      Logger.infer('Bad pagination request', error)
      throw new HttpException(error as string, HttpStatus.BAD_REQUEST)
    }
  }
}
