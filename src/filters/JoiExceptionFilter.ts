import { Logger } from '@duaneoli/logger'
import { HttpException } from '@nestjs/common'
import { ExceptionErrorDTO } from '../dtos/ExceptionDTO'

export class JoiExceptionFilter {
  static verifyIsError(exception: HttpException): boolean {
    return (
      exception.message.includes('Request validation of body') ||
      exception.message.includes('Request validation of query') ||
      exception.message.includes('Validation failed')
    )
  }

  static buildError(exception: HttpException): ExceptionErrorDTO {
    const castExceptionDTO = exception.getResponse() as ExceptionErrorDTO
    const exceptionDTO = new ExceptionErrorDTO({ error: exception.name, errorCode: 'JOI_ERROR', message: castExceptionDTO.message, type: 'WARN' })
    Logger.warn(exceptionDTO.errorCode as string, exceptionDTO.message)

    return exceptionDTO
  }
}
