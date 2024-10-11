import { Teacher } from '@/entities/teacher.entity'
import { User } from '@/entities/user.entity'
import { IUserRepository } from '@/repositories/user.repository.interface'

export class FindWithTeacherUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async handler(userId: number): Promise<(User & Teacher) | User | undefined> {
    const user = await this.userRepository.findWithTeacher(userId)
    return user
  }
}
