import { SendMailUseCase } from '@/use-cases/PasswordResetToken/send-mail-use-case'

export function makesendMailUseCase() {
  return new SendMailUseCase()
}
