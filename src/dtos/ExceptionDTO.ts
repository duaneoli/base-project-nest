import { HttpStatus } from '@nestjs/common'

type ExceptionType = 'ERROR' | 'WARN'

export class ExceptionDTO extends Error {
  public error: string
  public rejectedInputs?: Array<any>
  public type: ExceptionType
  public details: string
  public statusCode?: HttpStatus

  private constructor(type: ExceptionType, error: string, message: string, rejectedInputs?: Array<any>, statusCode?: HttpStatus) {
    super(message)
    this.error = error
    this.type = type
    this.details = message
    if (rejectedInputs) this.rejectedInputs = rejectedInputs
    if (statusCode) this.statusCode = statusCode
  }

  static error(error: string, message: string, rejectedInputs?: Array<any>, statusCode?: HttpStatus) {
    return new ExceptionDTO('ERROR', error, message, rejectedInputs, statusCode)
  }

  static warn(error: string, message: string, rejectedInputs?: Array<any>, statusCode?: HttpStatus) {
    return new ExceptionDTO('WARN', error, message, rejectedInputs, statusCode)
  }
}
