import { ExceptionErrorDTO } from './ExceptionDTO'

export class ErrorDTO {
  private error: string
  private errorCode?: string
  private message: string
  private rejectedInputs?: Array<any>

  constructor(exceptionDTO: ExceptionErrorDTO) {
    this.error = exceptionDTO.error || 'Unknown error'
    this.errorCode = exceptionDTO.errorCode
    this.message = exceptionDTO.message
    this.rejectedInputs = exceptionDTO.rejectedInputs
  }
}
