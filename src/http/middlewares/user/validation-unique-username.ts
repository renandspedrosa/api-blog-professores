import { NextFunction, Request, Response } from 'express'

export function validateCreateUserWithUniqueUsername(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (String(err).includes('duplicate key value violates unique constraint')) {
    return res.status(409).json({
      message: 'Tente cadastrar outro e-mail',
      errors: 'E-mail já cadastrado',
    })
  }
  next(err)
}
