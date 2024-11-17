import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export function validateLoginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({
    email: z
      .string()
      .min(1, 'E-mail é obrigatório')
      .email('E-mail com formato inválido. Tente novamente'),
    password: z.string().min(1, 'Password is required'),
  })

  try {
    req.body = registerBodySchema.parse(req.body)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Falha ao validar a criação do usuário.',
        errors: error.format(),
      })
    }

    next(error)
  }
}
