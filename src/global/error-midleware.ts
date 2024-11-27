import { Request, Response, NextFunction } from 'express'
import HttpException from './global-exception-handler'

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const status = error.status || 500
  const message = error.message || 'Algo deu errado'
  response.status(status).send({
    status,
    message,
  })
  next()
}

export default errorMiddleware
