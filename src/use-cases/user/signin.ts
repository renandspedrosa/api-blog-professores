import { IUserRepository } from '@/repositories/user.repository.interface'

export class SigninUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async handler(email: string) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('Credenciais inválidas')
    }

    return user
  }
}
