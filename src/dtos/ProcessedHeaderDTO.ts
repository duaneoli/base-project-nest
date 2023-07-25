import { Request } from 'express'

export class ProcessedHeaderDTO {
  baseUrl: string
  originalUrl: string
  agent: string
  httpVersion: string
  expirationTime?: number
  userId?: string
  origin: string
  ip?: string
  platform?: string
  requestId?: string

  constructor(request: Request) {
    this.agent = request.headers['user-agent'] as string
    this.httpVersion = request.httpVersion
    this.baseUrl = request.baseUrl === '' ? '/' : request.baseUrl
    this.originalUrl = request.originalUrl
    this.origin = request.headers['origin'] as string
    this.ip = request.headers['x-original-forwarded-for'] as string
    this.platform = request.headers['sec-ch-ua-platform'] as string
    this.requestId = request.headers['x-request-id'] as string
  }
}
