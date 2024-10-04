import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export function validateCreateStudent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    user_id: z.coerce.number(),
  })

  try {
    req.body = registerBodySchema.parse(req.body)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.format(),
      })
    }

    next(error)
  }
}
