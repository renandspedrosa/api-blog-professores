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
    // tags: z.array(
    //     z.object({
    //         id: z.coerce.number().optional(),
    //         name: z.string()
    //     })
    // ).optional()
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
