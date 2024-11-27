import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export function validateCreateStudent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z
      .string()
      .min(1, 'E-mail é obrigatório')
      .email('Formato de e-mail inválido. Por favor, tente novamente.'),
    password: z.string().min(1, 'Senha é obrigatória'),
  })

  try {
    req.body = registerBodySchema.parse(req.body)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Falha ao criar o estudante',
        errors: error.format(),
      })
    }

    next(error)
  }
}
