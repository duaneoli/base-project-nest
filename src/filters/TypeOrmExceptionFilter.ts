import { HttpException } from '@nestjs/common'
import { QueryFailedError } from 'typeorm'
import { Logger } from '../configurations/LoggerConfiguration'
import { ExceptionDTO } from '../dtos/ExceptionDTO'
import { QueryFailedErrorDTO } from '../dtos/QueryFailedErrorDTO'
import { PostgreSqlErrorCode } from '../helpers/PostgreSqlErrorCode'

export class TypeOrmExceptionFilter {
  constructor() {}

  static verifyIsError(exception: HttpException): boolean {
    return exception.getResponse() instanceof QueryFailedError
  }
  static buildError(exception: HttpException): ExceptionDTO {
    const queryFailedErrorDTO = new QueryFailedErrorDTO(exception.getResponse() as QueryFailedError)

    if (queryFailedErrorDTO.driverError.code === PostgreSqlErrorCode.UNIQUE_VIOLATION)
      Logger.warn(queryFailedErrorDTO.message, JSON.stringify({ query: queryFailedErrorDTO.query, params: queryFailedErrorDTO.parameters }))
    else Logger.error(queryFailedErrorDTO.message, JSON.stringify({ query: queryFailedErrorDTO.query, params: queryFailedErrorDTO.parameters }))

    return ExceptionDTO.error(queryFailedErrorDTO.message, queryFailedErrorDTO.driverError.detail)
  }
}
