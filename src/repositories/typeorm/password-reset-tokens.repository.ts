import { PasswordResetToken } from '@/entities/password-reset-tokens.entity'
import { Between, Repository } from 'typeorm'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { IPasswordResetTokenRepository } from '../password-reset-tokens.repository.interface'

export class PasswordResetTokenRepository
  implements IPasswordResetTokenRepository
{
  private repository: Repository<PasswordResetToken>

  constructor() {
    this.repository = appDataSource.getRepository(PasswordResetToken)
  }

  async create(
    passwordResetToken: PasswordResetToken,
  ): Promise<PasswordResetToken> {
    return this.repository.save(passwordResetToken)
  }

  async validatePasswordResetToken(
    token: string,
  ): Promise<PasswordResetToken | null> {
    const tokenRecord = await this.repository.findOne({
      where: {
        token,
        expires_at: Between(new Date(), new Date(9999, 11, 31)), // Verifica se a data de expiração não passou
      },
    })
    return tokenRecord || null // Retorna null se não encontrar um token válido
  }
}
