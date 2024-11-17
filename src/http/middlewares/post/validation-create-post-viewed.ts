import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'

export async function validateCreatePostViewed(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerParamsSchema = z.object({
    post_id: z
      .string()
      .uuid()
      .trim()
      .min(1, 'O ID da postagem não pode estar vazio.'),
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
  }
}
