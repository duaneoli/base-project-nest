import { ProcessedHeaderDTO } from '../dtos/ProcessedHeaderDTO'
import { ProcessedPayloadDTO } from './ProcessedPayloadDTO'

export class RequestDTO {
  processedHeaderDTO: ProcessedHeaderDTO
  processedPayloadDTO: ProcessedPayloadDTO

  constructor(request: any) {
    this.processedHeaderDTO = request.processedHeaderDTO
    this.processedPayloadDTO = request.processedPayloadDTO
  }
}
