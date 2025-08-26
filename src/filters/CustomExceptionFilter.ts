import { Logger } from '@duaneoli/logger'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ErrorDTO } from '../dtos/ErrorDTO'
import { ExceptionDTO, ExceptionErrorDTO } from '../dtos/ExceptionDTO'
import { ExceptionDTOFilter } from './ExceptionDTOFilter'
import { JoiExceptionFilter } from './JoiExceptionFilter'
import { TypeOrmExceptionFilter } from './TypeOrmExceptionFilter'

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(httpException: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    let exceptionDTO: ExceptionErrorDTO = httpException.getResponse() as ExceptionErrorDTO
    let statusCode = httpException.getStatus()
    if (!exceptionDTO.error) exceptionDTO.error = httpException.name

    if (ExceptionDTOFilter.verifyIsError(exceptionDTO)) exceptionDTO = ExceptionDTOFilter.buildError(exceptionDTO)
    else if (JoiExceptionFilter.verifyIsError(httpException)) exceptionDTO = JoiExceptionFilter.buildError(httpException)
    else if (TypeOrmExceptionFilter.verifyIsError(httpException)) exceptionDTO = TypeOrmExceptionFilter.buildError(httpException)
    else {
      exceptionDTO = ExceptionDTO.error(httpException.message, JSON.stringify(httpException.cause), [])
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR
      Logger.error('Unhandled error', exceptionDTO)
    }

    response.status(statusCode).json(new ErrorDTO(exceptionDTO))
  }
}
