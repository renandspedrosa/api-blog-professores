import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export function validateCreateSubject(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    status: z.number().optional().default(1),
  })

  try {
    req.body = registerBodySchema.parse(req.body)
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
