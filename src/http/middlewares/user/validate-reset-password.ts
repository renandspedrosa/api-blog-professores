import { makeValidatePasswordResetTokenUseCase } from '@/use-cases/factory/PasswordResetToken/make-validate-password-reset-token-use-case'
import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'

export async function validateResetPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({
    password: z.string().min(1, 'Senha é obrigatório'),
  })

  try {
    req.body = registerBodySchema.parse(req.body)
    const { token } = req.params
    const { password } = req.body

    if (!token || !password) {
      return res.status(400).json({ message: 'Token e senha são obrigatórios' })
    }

    if (typeof token !== 'string' || typeof password !== 'string') {
      return res
        .status(400)
        .json({ message: 'Token e senha devem ser strings' })
    }

    const validatePasswordResetTokenUseCase =
      makeValidatePasswordResetTokenUseCase()
    const passwordResetToken =
      await validatePasswordResetTokenUseCase.handler(token)
    req.body.user_id = passwordResetToken.user_id
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Erro ao validar token.',
        errors: error.format(),
      })
    }

    next(error)
  }
}
