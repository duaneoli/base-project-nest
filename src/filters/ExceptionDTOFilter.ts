import { Logger } from '../configurations/LoggerConfiguration'
import { ExceptionDTO } from '../dtos/ExceptionDTO'

export class ExceptionDTOFilter {
  static verifyIsError(exception: ExceptionDTO): boolean {
    return exception instanceof ExceptionDTO
  }

  static buildError(exception: ExceptionDTO): ExceptionDTO {
    const { message } = exception
    Logger.infer(message, exception)

    return exception
  }
}
