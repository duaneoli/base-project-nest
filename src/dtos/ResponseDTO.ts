import { HttpStatus, Logger } from '@nestjs/common'

export class ResponseDTO {
  public statusCode: HttpStatus
  public message: string
  public data: any
  public rejectedInputs?: Array<any>

  constructor(statusCode: HttpStatus, message: string, data?: any, rejectedInputs?: Array<any>) {
    if (statusCode > HttpStatus.AMBIGUOUS) {
      Logger.error('Response must belong to a successful request')
      process.exit(1)
    }

    this.statusCode = statusCode
    this.message = message
    if (data) this.data = data
    if (rejectedInputs && rejectedInputs.length) this.rejectedInputs = rejectedInputs
  }
}
