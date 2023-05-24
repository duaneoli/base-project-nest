export class RejectedInputDTO {
  identifier: string
  reason: string
  errorCode: number

  constructor(identifier: string, reason: string, errorCode: number) {
    this.identifier = identifier
    this.reason = reason
    this.errorCode = errorCode
  }
}
