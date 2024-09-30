import { UserRepository } from '@/repositories/typeorm/user.repository'
import { FindUserByEmailUseCase } from '@/use-cases/user/find-user-by-email'

export function makeFindUserByEmailUseCase() {
  const userRepository = new UserRepository()
  return new FindUserByEmailUseCase(userRepository)
}
