import { Request } from 'express'

export class ProcessedHeaderDTO {
  baseUrl: string
  originalUrl: string
  agent: string
  httpVersion: string
  expirationTime?: number
  userId?: string
  origin: string

  constructor(request: Request) {
    this.agent = request.headers['user-agent'] as string
    this.httpVersion = request.httpVersion
    this.baseUrl = request.baseUrl === '' ? '/' : request.baseUrl
    this.originalUrl = request.originalUrl
    this.origin = request.headers['origin'] as string
  }
}
