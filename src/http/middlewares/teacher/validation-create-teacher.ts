import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export function validateCreateTeacher(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })

  try {
    req.body = registerBodySchema.parse(req.body)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed for create Teacher',
        errors: error.format(),
      })
    }

    next(error)
  }
}
