import { IUserRepository } from '@/repositories/user.repository.interface'

export class FindUserByEmailUseCase {
  constructor(private userRespository: IUserRepository) {}

  async handler(email: string) {
    return await this.userRespository.findByEmail(email)
  }
}
