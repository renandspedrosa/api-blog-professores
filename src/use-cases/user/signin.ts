// import { InvalidCredentialError } from "@/repositories/errors/invalid-credential-error";
import { IUserRepository } from '@/repositories/user.repository.interface'

export class SigninUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async handler(username: string) {
    const user = await this.userRepository.findByUsername(username)

    if (!user) {
      // throw InvalidCredentialError;
      throw new Error('Invalid credentials')
    }

    return user
  }
}
