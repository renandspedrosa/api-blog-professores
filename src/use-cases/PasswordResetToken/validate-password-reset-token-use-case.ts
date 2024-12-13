import { IPasswordResetTokenRepository } from '@/repositories/password-reset-tokens.repository.interface'

export class ValidatePasswordResetTokenUseCase {
  constructor(
    private passwordResetTokenRepository: IPasswordResetTokenRepository,
  ) {}

  async handler(token: string) {
    const passwordResetToken =
      await this.passwordResetTokenRepository.validatePasswordResetToken(token)
    if (!passwordResetToken) {
      throw new Error('Token inválido')
    }
    return passwordResetToken
  }
}
