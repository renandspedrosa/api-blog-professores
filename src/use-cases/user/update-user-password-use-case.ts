import { IUserRepository } from '@/repositories/user.repository.interface'

export class UpdateUserPasswordUseCase {
  constructor(private userRepository: IUserRepository) {}
  async handler(user_id: number, password: string): Promise<void> {
    return this.userRepository.updatePassword(user_id, password)
  }
}
