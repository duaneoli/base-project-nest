import { Logger } from '@duaneoli/logger'
import { ExceptionErrorDTO } from '../dtos/ExceptionDTO'

export class ExceptionDTOFilter {
  static verifyIsError(exception: ExceptionErrorDTO): boolean {
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
