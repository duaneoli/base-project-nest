import { Injectable, NestMiddleware, UseFilters } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { NextFunction, Response } from 'express'
import { ExceptionDTO } from '../dtos/ExceptionDTO'
import { ProcessedHeaderDTO } from '../dtos/ProcessedHeaderDTO'
import { ProcessedPayloadDTO } from '../dtos/ProcessedPayloadDTO'
import { CustomExceptionFilter } from '../filters/CustomExceptionFilter'
import { BearerTokenProcessor } from '../helpers/BearerTokenProcessor'

@Injectable()
@UseFilters(new CustomExceptionFilter())
export class ProcessHeaderMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(request: any, response: Response, next: NextFunction) {
    if (!request.baseUrl.includes('health-check')) {
      try {
        if (request.headers === undefined) throw Error('No header given')
        request.processedHeaderDTO = new ProcessedHeaderDTO(request)

        if (request.headers['authorization']) {
          if (!request.headers['authorization'].includes(' ')) throw Error('Invalid bearer token format')
          const [bearer, token] = request.headers['authorization'].split(' ')
          if (bearer !== 'Bearer') throw Error('Invalid bearer token format')
          const bearerTokenProcessor = new BearerTokenProcessor(this.jwtService, token)
          if (!bearerTokenProcessor.isBearerToken()) throw Error('JWT decode error')
          if (!bearerTokenProcessor.isSignatureValid()) throw Error('Signature is not valid')

          request.processedPayloadDTO = ProcessedPayloadDTO.newInstaceBasedOnRequest(bearerTokenProcessor.payload)
          request.processedHeaderDTO.userId = bearerTokenProcessor.payload?.id
          request.processedHeaderDTO.expirationTime = bearerTokenProcessor.expirationTime
        }
      } catch (error: any) {
        request.error = ExceptionDTO.warn('Access denied', error.message)
      }
    }
    next()
  }
}
