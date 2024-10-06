import { UserRepository } from '@/repositories/typeorm/user.repository'
import { UpdateUserUseCase } from '@/use-cases/user/update-user'

export function makeUpdateUserUseCase() {
  const userRepository = new UserRepository()
  const updateUser = new UpdateUserUseCase(userRepository)
  return updateUser
}
