import { makeCreatePasswordResetTokenUseCase } from '@/use-cases/factory/PasswordResetToken/make-create-password-reset-token-use-case'
import { makesendMailUseCase } from '@/use-cases/factory/PasswordResetToken/make-send-mail-use-case'
import { makeFindUserByEmailUseCase } from '@/use-cases/factory/user/make-find-user-by-email-use-case'
import { Request, Response, NextFunction } from 'express'

export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email } = req.body
  const createPasswordResetToken = makeCreatePasswordResetTokenUseCase()
  const findUserByEmailUseCase = makeFindUserByEmailUseCase()
  const sendMail = makesendMailUseCase()
  try {
    const user = await findUserByEmailUseCase.handler(email)
    const token = await createPasswordResetToken.handler(user.id)
    const responseSendMail = await sendMail.handler(email, token)
    if (!responseSendMail) {
      throw new Error('Erro ao enviar e-mail')
    }
    return res.status(200).json({ message: `Email enviado com sucesso` })
  } catch (error) {
    next(error)
  }
}
