import { NextFunction, Request, Response } from 'express'
export function SwaggerAuthMiddlewareCreate(login: string, password: string): (req: Request, res: Response, next: NextFunction) => void {
  function isAuthorized(authHeader: string): boolean {
    const [authType, credentials] = authHeader.split(' ')

    if (authType !== 'Basic') return false

    const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf-8')
    const [username, pass] = decodedCredentials.split(':')

    return username === login && pass === password
  }

  return function swaggerAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const credentials = req.headers['authorization']

    if (!credentials || !isAuthorized(credentials)) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Authentication Required"')
      res.status(401).send('Unauthorized')
      return
    }

    next()
  }
}
