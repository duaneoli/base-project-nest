import { QueryFailedError } from 'typeorm'
import { DriverErrorDTO } from './DriveErrorDTO'

export class QueryFailedErrorDTO implements QueryFailedError {
  query: any
  parameters: any[]
  driverError: DriverErrorDTO
  message: string
  name: string

  constructor(queryFailed: QueryFailedError) {
    this.query = queryFailed.query
    this.parameters = queryFailed.parameters || []
    this.driverError = new DriverErrorDTO(queryFailed.driverError)
    this.message = queryFailed.message
    this.name = queryFailed.name
  }
}
