import { IUserRepository } from '@/repositories/user.repository.interface'

export class FindUserByIdUseCase {
  constructor(private userRespository: IUserRepository) {}

  async handler(id: number) {
    return await this.userRespository.findById(id)
  }
}
