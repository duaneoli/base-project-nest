import { HttpException, HttpStatus, Injectable, NestMiddleware, Type, mixin } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { ExceptionDTO } from '../dtos/ExceptionDTO'

export type PageMiddlewareOptions = {
  defaultPageSize: number
  maxPageSize: number
}

const defaultOptions = {
  defaultPageSize: 20,
  maxPageSize: 100,
}

export function PageMiddlewareCreate(options: Partial<PageMiddlewareOptions>): Type<NestMiddleware> {
  @Injectable()
  class PagerMiddleware implements NestMiddleware {
    use(request: Request, response: Response, next: NextFunction) {
      const _options = Object.assign(defaultOptions, options)
      try {
        const page = request.query.page ? Number(request.query.page) : 1
        const pageSize = request.query.pageSize ? Number(request.query.pageSize) : _options.defaultPageSize

        if (Number.isNaN(page) || Number.isNaN(pageSize)) throw ExceptionDTO.warn('Bad pagination request', 'Paging parameters should be numeric')
        if (page <= 0 || pageSize <= 0) throw ExceptionDTO.warn('Bad pagination request', 'Paging parameters must be positive numbers')
        if (pageSize > _options.maxPageSize) throw ExceptionDTO.warn('Bad pagination request', 'Maximum page size allowed is 100')

        request.query.page = ((page - 1) * pageSize).toString()
        request.query.pageSize = pageSize.toString()
        next()
      } catch (error) {
        throw new HttpException(error as string, HttpStatus.BAD_REQUEST)
      }
    }
  }
  return mixin(PagerMiddleware)
}
