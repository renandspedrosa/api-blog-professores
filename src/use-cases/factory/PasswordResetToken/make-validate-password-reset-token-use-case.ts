import { PasswordResetTokenRepository } from '@/repositories/typeorm/password-reset-tokens.repository'
import { ValidatePasswordResetTokenUseCase } from '@/use-cases/PasswordResetToken/validate-password-reset-token-use-case'

export function makeValidatePasswordResetTokenUseCase() {
  const passwordResetTokenRepository = new PasswordResetTokenRepository()
  return new ValidatePasswordResetTokenUseCase(passwordResetTokenRepository)
}
