import { UserRepository } from '@/repositories/typeorm/user.repository'
import { FindUserByIdUseCase } from '@/use-cases/user/find-user-by-id'

export function makeFindUserByIdUseCase() {
  const userRepository = new UserRepository()
  return new FindUserByIdUseCase(userRepository)
}
