import { IUser } from '@/entities/models/user.interface'
import { IUserRepository } from '@/repositories/user.repository.interface'

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async handler(userData: IUser): Promise<IUser> {
    return this.userRepository.update(userData)
  }
}
