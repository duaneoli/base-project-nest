import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { ExceptionDTO } from '../dtos/ExceptionDTO'
import { ProcessedHeaderDTO } from '../dtos/ProcessedHeaderDTO'

@Injectable()
export class ProcessHeaderMiddleware implements NestMiddleware {
  use(request: any, response: Response, next: NextFunction) {
    if (!request.baseUrl.includes('health-check')) {
      try {
        if (request.headers === undefined) throw Error('No header given')
        request.processedHeaderDTO = new ProcessedHeaderDTO(request)
      } catch (error: any) {
        request.error = ExceptionDTO.warn('Access denied', error.message)
      }
    }
    next()
  }
}
