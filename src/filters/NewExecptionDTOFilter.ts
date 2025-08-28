import { Logger } from '@duaneoli/logger'
import { ExceptionErrorDTO } from '../dtos'

export class NewExceptionDTOFilter {
  static verifyIsError(exception: ExceptionErrorDTO): boolean {
    console.log('teste', exception instanceof ExceptionErrorDTO)
    return exception instanceof ExceptionErrorDTO
  }

  static buildError(exception: ExceptionErrorDTO): ExceptionErrorDTO {
    const message = exception.errorCode ? `${exception.errorCode} - ${exception.message}` : exception.message
    const error = exception.error || 'Unknown error'
    if (exception.type == 'WARN') Logger.warn(error, message)
    else Logger.error(error, message)
    return exception
  }
}
