import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export async function validationGetCommentById(
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
        message: 'Validation failed',
        errors: error.format(),
      })
    }

    next(error)
  }
}
