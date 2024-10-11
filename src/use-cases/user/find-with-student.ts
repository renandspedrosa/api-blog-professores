import { Student } from '@/entities/student.entity'
import { User } from '@/entities/user.entity'
import { IUserRepository } from '@/repositories/user.repository.interface'

export class FindWithStudentUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async handler(userId: number): Promise<(User & Student) | User | undefined> {
    const user = await this.userRepository.findWithStudent(userId)
    return user
  }
}
