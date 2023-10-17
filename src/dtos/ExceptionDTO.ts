import { HttpStatus } from '@nestjs/common'

type ExceptionType = 'ERROR' | 'WARN'

export class ExceptionDTO extends Error {
  public errorCode: string
  public rejectedInputs?: Array<any>
  public type: ExceptionType
  public details: string
  public statusCode?: HttpStatus

  private constructor(type: ExceptionType, errorCode: string, message: string, rejectedInputs?: Array<any>, statusCode?: HttpStatus) {
    super(message)
    this.errorCode = errorCode
    this.type = type
    this.details = message
    if (rejectedInputs) this.rejectedInputs = rejectedInputs
    if (statusCode) this.statusCode = statusCode
  }

  static error(errorCode: string, message: string, rejectedInputs?: Array<any>, statusCode?: HttpStatus) {
    return new ExceptionDTO('ERROR', errorCode, message, rejectedInputs, statusCode)
  }

  static warn(errorCode: string, message: string, rejectedInputs?: Array<any>, statusCode?: HttpStatus) {
    return new ExceptionDTO('WARN', errorCode, message, rejectedInputs, statusCode)
  }
}
