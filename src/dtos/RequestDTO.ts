import { ProcessedHeaderDTO } from '../dtos/ProcessedHeaderDTO'

export class RequestBaseDTO {
  processedHeaderDTO: ProcessedHeaderDTO

  constructor(request: any) {
    this.processedHeaderDTO = request.processedHeaderDTO
  }
}
