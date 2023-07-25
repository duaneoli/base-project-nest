import { HttpException, HttpStatus, Injectable, NestMiddleware, UseFilters } from '@nestjs/common'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { NextFunction, Response } from 'express'
import { Logger } from '../configurations/LoggerConfiguration'
import { ProcessedHeaderDTO } from '../dtos/ProcessedHeaderDTO'
import { CustomExceptionFilter } from '../filters/CustomExceptionFilter'
dayjs.extend(duration)

@Injectable()
@UseFilters(new CustomExceptionFilter())
export class LoggerMiddleware implements NestMiddleware {
  use(request: any, response: Response, next: NextFunction) {
    if (!request.baseUrl.includes('health-check')) {
      const startTime = new Date()
      let { baseUrl, agent, httpVersion, originalUrl, origin, requestId, ip, platform }: ProcessedHeaderDTO = request.processedHeaderDTO

      let contentLength = request.get('content-length') ? request.get('content-length').concat('b') : 'content-length'
      origin = origin ? origin : 'origin'

      Logger.startRoute(`${request.method} ${originalUrl} HTTP/${httpVersion} ${contentLength} ${origin} ${agent} ${ip} ${platform} ${requestId}`)

      response.on('close', () => {
        const { statusCode } = response
        let { userId, expirationTime } = request.processedHeaderDTO
        contentLength = response.get('content-length') ? response.get('content-length')?.concat('b') : 'content-length'

        if (statusCode === 400 && Object.keys(request.body).length > 0) Logger.debug(`Body of request: ${JSON.stringify(request.body)}`)

        if (expirationTime) {
          const momentExpirationTime = dayjs.unix(expirationTime)
          const nowTime = dayjs()
          const durationForExpirationJWT = momentExpirationTime.isAfter(nowTime) ? momentExpirationTime.diff(nowTime) : 0
          expirationTime = Math.round(dayjs.duration(durationForExpirationJWT).asMinutes())
        } else expirationTime = -1

        const finishedTime = new Date()
        const deltaTime = (finishedTime.getTime() - startTime.getTime()).toString().concat('ms')

        const identity = userId ? userId : 'anonymous'
        const token = userId ? (expirationTime > 0 ? String(expirationTime).concat('m') : 'expired') : 'infinity'

        Logger.finishRoute(`${request.method} ${baseUrl} ${statusCode} ${contentLength} ${deltaTime} ${origin} ${identity} ${token} ${requestId}`)
      })

      if (request.error) throw new HttpException(request.error, HttpStatus.UNAUTHORIZED)
    }
    next()
  }
}
