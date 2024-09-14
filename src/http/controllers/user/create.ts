import { makeCreateUserUseCase } from '@/use-cases/factory/user/make-create-user-use-case'
import { hash } from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body

    const hashedPassword = await hash(password, 8)

    const userWithHashedPassword = { username, password: hashedPassword }

    const createUserUseCase = makeCreateUserUseCase()

    const user = await createUserUseCase.handler(userWithHashedPassword)

    return res.status(201).json({ id: user?.id, username: user?.username })
  } catch (error) {
    next(error)
  }
}
