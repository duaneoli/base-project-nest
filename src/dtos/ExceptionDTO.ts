type ExceptionType = 'ERROR' | 'WARN'

export class ExceptionErrorDTO {
  error?: string
  errorCode?: string
  message: string
  rejectedInputs?: Array<any>
  type?: ExceptionType

  constructor(error: Partial<ExceptionErrorDTO> & { message: string }) {
    this.error = error.error
    this.errorCode = error.errorCode
    this.message = error.message
    this.rejectedInputs = error.rejectedInputs
    this.type = error.type
  }
}

export class ExceptionDTO<T extends Record<string, string> = Record<string, string>> {
  errorCode: T
  constructor(errorCode: T) {
    this.errorCode = errorCode
  }

  static warn(error: string, message: string, rejectedInputs?: Array<any>): ExceptionErrorDTO {
    return new ExceptionErrorDTO({ error, message, rejectedInputs, type: 'WARN' })
  }

  static error(error: string, message: string, rejectedInputs?: Array<any>): ExceptionErrorDTO {
    return new ExceptionErrorDTO({ error, message, rejectedInputs, type: 'ERROR' })
  }

  make(errorCode: keyof T = '', type: ExceptionType = 'WARN', rejectedInputs?: Array<any>) {
    return new ExceptionErrorDTO({ errorCode: errorCode as string, message: this.errorCode[errorCode], type, rejectedInputs })
  }
}
