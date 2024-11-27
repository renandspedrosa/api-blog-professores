import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export function validationFindByTerm(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerParamsSchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
    term: z.string().default(''),
  })

  try {
    req.body = registerParamsSchema.parse(req.query)
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
