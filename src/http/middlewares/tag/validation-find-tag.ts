import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export function validationFindTag(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerParamsSchema = z.object({
    id: z.coerce.string(),
  })

  try {
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
