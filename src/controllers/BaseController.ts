import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
@Controller()
export class BaseController {
  @Get('health-check')
  healthCheck(@Res() req: Response) {
    if (req) {
      req.sendDate = false
      req.shouldKeepAlive = false
      req.set('Etag', '1')
      req.removeHeader('Connection')
      req.removeHeader('X-Powered-By')
      req.removeHeader('Access-Control-Allow-Origin')
      req.set('Content-Type', 'text/plain')
    }
    req.send('Healthy!')
  }
}
