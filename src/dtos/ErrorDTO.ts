import { HttpStatus, Logger } from '@nestjs/common'

export class ErrorDTO {
  error?: string
  message?: string
  errorCode?: string
  rejectedInputs?: Array<any>
  statusCode?: HttpStatus

  constructor(errorDTO: Partial<ErrorDTO>) {
    if (errorDTO.statusCode && errorDTO.statusCode < HttpStatus.AMBIGUOUS) {
      Logger.error('Error must belong to an unsuccessful request')
      process.exit(1)
    }

    this.statusCode = errorDTO.statusCode
    this.error = errorDTO.error
    this.errorCode = errorDTO.errorCode
    this.message = errorDTO.message
    this.rejectedInputs = errorDTO.rejectedInputs
  }
}
