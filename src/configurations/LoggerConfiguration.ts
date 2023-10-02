import { Logger as Log } from '@duaneoli/logger'
import { ExceptionDTO } from '../dtos'

export class Logger extends Log {
  public static infer(message: string, error: ExceptionDTO | any) {
    if (error && error instanceof ExceptionDTO) {
      const { type, ...exceptionDTO } = error
      type === 'WARN' ? this.warn(message, exceptionDTO.details) : this.error(message, exceptionDTO)
    } else this.error(message, error)
  }
}
