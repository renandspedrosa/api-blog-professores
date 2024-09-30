// import { InvalidCredentialError } from "@/repositories/errors/invalid-credential-error";
import { IUserRepository } from '@/repositories/user.repository.interface'

export class SigninUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async handler(email: string) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      // throw InvalidCredentialError;
      throw new Error('Invalid credentials')
    }

    return user
  }
}
