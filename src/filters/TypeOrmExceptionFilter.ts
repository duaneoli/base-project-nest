import { Logger } from '@duaneoli/logger'
import { HttpException } from '@nestjs/common'
import { QueryFailedError } from 'typeorm'
import { ExceptionDTO, ExceptionErrorDTO } from '../dtos/ExceptionDTO'
import { QueryFailedErrorDTO } from '../dtos/QueryFailedErrorDTO'
import { PostgreSqlErrorCode } from '../helpers/PostgreSqlErrorCode'

export class TypeOrmExceptionFilter {
  constructor() {}

  static verifyIsError(exception: HttpException): boolean {
    return exception.cause?.name == 'QueryFailedError'
  }
  static buildError(exception: HttpException): ExceptionErrorDTO {
    const queryFailedErrorDTO = new QueryFailedErrorDTO(exception.cause as QueryFailedError)
    let error = queryFailedErrorDTO.message
    let message = queryFailedErrorDTO.driverError.detail
    switch (queryFailedErrorDTO.driverError.code) {
      case PostgreSqlErrorCode.UNIQUE_VIOLATION:
        Logger.warn(queryFailedErrorDTO.message, JSON.stringify({ query: queryFailedErrorDTO.query, params: queryFailedErrorDTO.parameters }))
        break
      case PostgreSqlErrorCode.GROUPING_ERROR:
        Logger.warn(queryFailedErrorDTO.message, JSON.stringify({ query: queryFailedErrorDTO.query, params: queryFailedErrorDTO.parameters }))
        error = 'Grouping error'
        message = 'Some columns must appear in te group by clause'
      default:
        Logger.error(queryFailedErrorDTO.message, JSON.stringify({ query: queryFailedErrorDTO.query, params: queryFailedErrorDTO.parameters }))
    }
    return ExceptionDTO.warn(message, 'Query failed error', [])
  }
}
