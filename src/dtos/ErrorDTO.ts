import { HttpStatus, Logger } from '@nestjs/common'
import { ExceptionDTO } from './ExceptionDTO'

export class ErrorDTO {
  public statusCode: HttpStatus
  private error: string
  private message: string
  private errorCode: string
  private rejectedInputs?: Array<any>

  constructor(statusCode: HttpStatus, error: string, exceptionDTO: ExceptionDTO) {
    if (statusCode < HttpStatus.AMBIGUOUS) {
      Logger.error('Error must belong to an unsuccessful request')
      process.exit(1)
    }

    this.statusCode = statusCode
    this.error = error
    this.errorCode = exceptionDTO.errorCode
    this.message = exceptionDTO.details
    if (exceptionDTO.rejectedInputs) this.rejectedInputs = exceptionDTO.rejectedInputs
  }
}
