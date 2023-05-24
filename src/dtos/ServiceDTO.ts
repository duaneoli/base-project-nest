import { RejectedInputDTO } from '../dtos/RejectInputDTO'

export class ServiceDTO<T> {
  transactions?: any
  entities: Array<T>
  totalElements?: number
  rejectedInputs?: Array<RejectedInputDTO>

  constructor(entities: Array<T>, totalElements?: number, rejectedInputs?: Array<RejectedInputDTO>, transactions?: any) {
    this.entities = entities
    this.totalElements = totalElements !== undefined ? totalElements : entities.length
    if (transactions) this.transactions = { ...transactions }
    if (rejectedInputs) this.rejectedInputs = rejectedInputs
  }
}
