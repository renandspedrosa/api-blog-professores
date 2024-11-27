import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export function validateCreateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z
      .string()
      .min(1, 'E-mail é obrigatório')
      .email('E-mail com formato inválido. Tente novamente'),
    password: z.string().min(1, 'Senha é obrigatório'),
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
