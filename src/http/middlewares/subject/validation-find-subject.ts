import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export function validationFindSubject(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerParamsSchema = z.object({
    id: z.coerce.string(),
  })

  try {
    // console.log do que esta vindo do get
    req.params = registerParamsSchema.parse(req.params)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors: error.format(),
      })
    }

    next(error)
  }
}
