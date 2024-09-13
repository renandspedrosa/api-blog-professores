import { UserRepository } from "@/repositories/typeorm/user.repository";
import { SigninUseCase } from "../user/signin";

export function makeSigninUseCase() {
    const userRepository = new UserRepository();
    return new SigninUseCase(userRepository);
}