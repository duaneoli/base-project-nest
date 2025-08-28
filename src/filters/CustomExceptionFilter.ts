import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { Logger } from '../configurations/LoggerConfiguration'
import { ExceptionErrorDTO } from '../dtos'
import { ErrorDTO } from '../dtos/ErrorDTO'
import { ExceptionDTO } from '../dtos/ExceptionDTO'
import { ExceptionDTOFilter } from './ExceptionDTOFilter'
import { JoiExceptionFilter } from './JoiExceptionFilter'
import { NewExceptionDTOFilter } from './NewExecptionDTOFilter'
import { TypeOrmExceptionFilter } from './TypeOrmExceptionFilter'

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(httpException: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()

    let exceptionDTO: ExceptionDTO = {} as ExceptionDTO
    const cause = httpException.cause as ExceptionDTO

    if (ExceptionDTOFilter.verifyIsError(cause)) exceptionDTO = ExceptionDTOFilter.buildError(cause)
    else if (NewExceptionDTOFilter.verifyIsError(httpException.getResponse() as ExceptionErrorDTO)) {
      const newExceptionDTO = NewExceptionDTOFilter.buildError(httpException.getResponse() as ExceptionErrorDTO)
      response.status(httpException.getStatus()).json(new ErrorDTO(newExceptionDTO))
      return
    } else if (JoiExceptionFilter.verifyIsError(httpException)) exceptionDTO = JoiExceptionFilter.buildError(httpException)
    else if (TypeOrmExceptionFilter.verifyIsError(httpException)) exceptionDTO = TypeOrmExceptionFilter.buildError(httpException)
    else exceptionDTO = ExceptionDTO.error(httpException.message, JSON.stringify(httpException.cause))

    if (!httpException) {
      Logger.error('HttpException nothing filter and transform to ExceptionDTO')
      process.exit(1)
    }
    const statusCode = exceptionDTO.statusCode || httpException.getStatus()
    response
      .status(statusCode)
      .json(new ErrorDTO({ statusCode, error: httpException.message, message: exceptionDTO.details, rejectedInputs: exceptionDTO.rejectedInputs }))
  }
}
