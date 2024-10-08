import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'

export async function validateCreatePostViewed(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({
    student_id: z.coerce.number().min(1, 'Student Id cannot be empty'),
  })

  const registerParamsSchema = z.object({
    post_id: z.string().uuid().trim().min(1, 'Post Id cannot be empty'),
  })

  try {
    req.body = registerBodySchema.parse(req.body)
    req.params = registerParamsSchema.parse(req.params)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.format(),
      })
    }
  }
}
