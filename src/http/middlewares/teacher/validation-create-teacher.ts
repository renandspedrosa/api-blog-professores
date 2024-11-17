import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export function validateCreateTeacher(
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
    subjects: z
      .array(
        z
          .object({
            id: z.coerce.string().optional(),
            name: z.string().optional(),
          })
          .refine((data) => data.id || data.name, {
            message:
              'É necessário fornecer "id" ou "nome" para cada disciplina.',
            path: ['subjects'],
          }),
      )
      .optional(),
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
