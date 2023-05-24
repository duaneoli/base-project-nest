export class DriverErrorDTO {
  length: string
  severity: string
  code: string
  detail: string
  hint: string
  position: string
  internalPosition: string
  internalQuery: string
  where: string
  schema: string
  table: string
  column: string
  dataType: string
  constraint: string
  file: string
  line: string
  routine: string
  constructor(driverError: any) {
    this.length = driverError.length
    this.severity = driverError.severity
    this.code = driverError.code
    this.detail = driverError.detail
    this.hint = driverError.hint
    this.position = driverError.position
    this.internalPosition = driverError.internalPosition
    this.internalQuery = driverError.internalQuery
    this.where = driverError.where
    this.schema = driverError.schema
    this.table = driverError.table
    this.column = driverError.column
    this.dataType = driverError.dataType
    this.constraint = driverError.constraint
    this.file = driverError.file
    this.line = driverError.line
    this.routine = driverError.routine
  }
}
