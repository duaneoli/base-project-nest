import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { Logger } from '../configurations/LoggerConfiguration'
import { ErrorDTO } from '../dtos/ErrorDTO'
import { ExceptionDTO } from '../dtos/ExceptionDTO'
import { ExceptionDTOFilter } from './ExceptionDTOFilter'
import { JoiExceptionFilter } from './JoiExceptionFilter'
import { TypeOrmExceptionFilter } from './TypeOrmExceptionFilter'

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(httpException: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()

    let exceptionDTO: ExceptionDTO
    const cause = httpException.cause as ExceptionDTO

    if (ExceptionDTOFilter.verifyIsError(cause)) exceptionDTO = ExceptionDTOFilter.buildError(cause)
    else if (JoiExceptionFilter.verifyIsError(httpException)) exceptionDTO = JoiExceptionFilter.buildError(httpException)
    else if (TypeOrmExceptionFilter.verifyIsError(httpException)) exceptionDTO = TypeOrmExceptionFilter.buildError(httpException)
    else exceptionDTO = ExceptionDTO.error(httpException.message, JSON.stringify(httpException.cause))

    if (!httpException) {
      Logger.error('HttpException nothing filter and transform to ExceptionDTO')
      process.exit(1)
    }
    const statusCode = exceptionDTO.statusCode || httpException.getStatus()
    response.status(statusCode).json(new ErrorDTO(statusCode, exceptionDTO))
  }
}
