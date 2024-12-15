import { makeUpdateUserPasswordUseCase } from '@/use-cases/factory/user/make-update-user-password-use-case'
import { hash } from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { user_id } = req.body
  const { password } = req.body
  const hashedPassword = await hash(password, 8)
  const updateUserPasswordUseCase = makeUpdateUserPasswordUseCase()
  try {
    await updateUserPasswordUseCase.handler(user_id, hashedPassword)
    return res.status(200).json({ message: `Senha atualizada com sucesso` })
  } catch (error) {
    next(error)
  }
}
