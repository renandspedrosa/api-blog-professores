import { PasswordResetTokenRepository } from '@/repositories/typeorm/password-reset-tokens.repository'
import { CreatePasswordResetTokenUseCase } from '@/use-cases/PasswordResetToken/create-password-reset-token-use-case'

export function makeCreatePasswordResetTokenUseCase() {
  const passwordResetTokenRepository = new PasswordResetTokenRepository()
  return new CreatePasswordResetTokenUseCase(passwordResetTokenRepository)
}
