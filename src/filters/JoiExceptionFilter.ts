import { HttpException } from '@nestjs/common'
import { Logger } from '../configurations/LoggerConfiguration'
import { ExceptionDTO } from '../dtos/ExceptionDTO'

export class JoiExceptionFilter {
  static verifyIsError(exception: HttpException): boolean {
    return (
      exception.message.includes('Request validation of body') ||
      exception.message.includes('Request validation of query') ||
      exception.message.includes('Validation failed')
    )
  }

  static buildError(exception: HttpException): ExceptionDTO {
    const castExceptionDTO = exception.getResponse() as ExceptionDTO
    const exceptionDTO = ExceptionDTO.warn(castExceptionDTO.error, exception.message)
    Logger.infer('Request rejected by Joi', exceptionDTO)

    return exceptionDTO
  }
}
