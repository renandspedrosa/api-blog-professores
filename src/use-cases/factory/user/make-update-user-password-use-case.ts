import { UserRepository } from '@/repositories/typeorm/user.repository'
import { UpdateUserPasswordUseCase } from '@/use-cases/user/update-user-password-use-case'

export function makeUpdateUserPasswordUseCase() {
  const userRepository = new UserRepository()
  return new UpdateUserPasswordUseCase(userRepository)
}
