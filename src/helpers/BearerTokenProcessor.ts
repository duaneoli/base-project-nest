import { JwtService } from '@nestjs/jwt'
import { ProcessedPayloadDTO } from '../dtos/ProcessedPayloadDTO'

export class BearerTokenProcessor {
  private jwtService: JwtService
  token: string = ''
  payload?: ProcessedPayloadDTO
  expirationTime?: number
  creationTime?: string

  constructor(jwtService: JwtService, token?: string) {
    this.jwtService = jwtService
    if (token) this.token = token
  }

  isBearerToken(): boolean {
    return this.jwtService.decode(this.token) ? true : false
  }

  isSignatureValid(): boolean {
    const bearerTokenProcessor = this.jwtService.verify(this.token)
    this.payload = bearerTokenProcessor.payload
    this.expirationTime = bearerTokenProcessor.exp
    this.creationTime = bearerTokenProcessor.jti

    return true
  }

  matchesPayload(): boolean {
    return !!this.payload && ProcessedPayloadDTO.matchesObject(this.payload)
  }

  create(payload: ProcessedPayloadDTO, expirationTime: string = '1d'): string {
    const options = expirationTime ? { expiresIn: expirationTime } : undefined
    return this.jwtService.sign({ payload }, options)
  }
}
