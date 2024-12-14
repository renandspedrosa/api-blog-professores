import { IPasswordResetToken } from '@/entities/models/password-reset-tokens.interface'

export interface IPasswordResetTokenRepository {
  create(tag: IPasswordResetToken): Promise<IPasswordResetToken>
  validatePasswordResetToken(token: string): Promise<IPasswordResetToken>
}
