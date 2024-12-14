import { makeFindUserByEmailUseCase } from '@/use-cases/factory/user/make-find-user-by-email-use-case'
import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'

export async function validateEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({
    email: z
      .string()
      .min(1, 'E-mail é obrigatório')
      .email('E-mail com formato inválido. Tente novamente'),
  })

  try {
    req.body = registerBodySchema.parse(req.body)
    const { email } = req.body
    const findUserByEmailUseCase = makeFindUserByEmailUseCase()
    const userByEmail = await findUserByEmailUseCase.handler(email)

    if (!userByEmail) {
      return res.status(404).json({ message: 'E-mail não encontrado.' })
    }
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Erro ao enviar e-mail.',
        errors: error.format(),
      })
    }

    next(error)
  }
}
