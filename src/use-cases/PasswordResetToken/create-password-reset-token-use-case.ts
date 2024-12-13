import { IPasswordResetToken } from '@/entities/models/password-reset-tokens.interface'
import { IPasswordResetTokenRepository } from '@/repositories/password-reset-tokens.repository.interface'
import crypto from 'crypto'

export class CreatePasswordResetTokenUseCase {
  constructor(
    private passwordResetTokenRepository: IPasswordResetTokenRepository,
  ) {}

  async handler(user_id: number): Promise<string> {
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1)

    const token = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const passwordResetToken: IPasswordResetToken = {
      user_id,
      token: hashedToken,
      expires_at: expiresAt,
    }
    await this.passwordResetTokenRepository.create(passwordResetToken)
    return hashedToken
  }
}
